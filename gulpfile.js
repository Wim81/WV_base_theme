// gulpfile.js
var gulp = require("gulp");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
var sourcemaps = require("gulp-sourcemaps");
var browserSync = require("browser-sync").create();
var rename = require("gulp-rename");
var watch = require("gulp-watch");
var jslint = require("gulp-jslint");
var uglify = require("gulp-uglify");
var imagemin = require("gulp-imagemin");


// Name of the css file which will be produced in the dist folder. Modify if you wish.
var cssFileName = "style.css";


// Define both source and destination folders & affected file types
var paths = {
    styles: {
        src: "src/scss/**/*.scss",
        dest: "dist/css"
    },
    html: "./*.html",
    scripts: {
        src: "src/js/**/*.js",
        dest: "dist/js"
    },
    images: {
        src: "src/img/**/*.{jpg,png,gif,svg}",
        dest: "dist/img/"
    }
};

// CSS style task
function style() {

    return (
        gulp
            .src(paths.styles.src)
            .pipe(sourcemaps.init())
            .pipe(sass())
            .on("error", sass.logError)
            .pipe(postcss([autoprefixer(), cssnano()]))
            .pipe(sourcemaps.write())
            .pipe(rename(cssFileName))
            .pipe(gulp.dest(paths.styles.dest))
            .pipe(browserSync.stream())
    );
}

exports.style = style;


// JS task
function script() {
    return (
        gulp
            .src(paths.scripts.src)
            .pipe(sourcemaps.init())
            .pipe(jslint())
            .pipe(uglify())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.scripts.dest))
            .pipe(browserSync.stream())
    );
}

exports.script = script;

// images task
function images() {
    return (
        gulp
            .src(paths.images.src)
            .pipe(imagemin({verbose: true}))
            .pipe(gulp.dest(paths.images.dest))
            .pipe(browserSync.stream())
    );
}

exports.images = images;


// A simple task to reload the page
function reload() {
    browserSync.reload();
}


function watcher(){
    browserSync.init({
        // You can tell browserSync to use this directory and serve it as a mini-server
        server: {
            baseDir: "./"
        }
    });
    style();
    script();
    // images();
    // for each watcher, we first define the location which needs to be watched
    // and then we define which function needs to be executed upon change
    watch(paths.styles.src, style);
    watch(paths.html, reload);
    watch(paths.scripts.src, script);
    // watch(paths.images.src, images);
}

exports.watch = watcher;
