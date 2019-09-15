// gulpfile.js
const gulp = require("gulp");
const polyfill = require("babel-polyfill"); /* moet misschien nog weg, op dit moment niet in use */
const babel = require("gulp-babel");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const rename = require("gulp-rename");
const watch = require("gulp-watch");
const jslint = require("gulp-jslint");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");


// Name of the css file which will be produced in the dist folder. Modify if you wish.
const cssFileName = "style.css";


// Define both source and destination folders & affected file types
const paths = {
    styles: {
        src: "src/scss/**/*.scss",
        dest: "dist/css"
    },
    html: "./*.html",
    scripts: {
        src: ["src/js/**/*.js"],
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
            .pipe(babel({presets: ['@babel/env']}))
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
            .pipe(newer(paths.images.dest))
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
    images();
    // for each watcher, we first define the location which needs to be watched
    // and then we define which function needs to be executed upon change
    watch(paths.styles.src, style);
    watch(paths.html, reload);
    watch(paths.scripts.src, script);
    watch(paths.images.src, images);
}

exports.watch = watcher;
