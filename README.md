# WV_base_theme

## Introduction

Welcome to the documentation of my personal front-end base theme.
This theme uses the following technologies/frameworks/libraries:

- **Sass** for CSS preprocessing
- **Bootstrap** as a front-end framework and the basis upon which I built my personal styles
- **FontAwesome** for all things icons
- **Gulp** for automation
- **jQuery** because I still like it, even in this day and age, for writing simpler Javascript

This theme contains a kitchen sink page, which shows all default components.
The idea is to take this as a easy starting point upon which to build a new, custom theme.

This base theme has a lot of default values which show how the components are built.
These default values should be overwritten. When you dou, please remove the *//default* comment for obvious reasons

In general, a BEM methodology has been used in the Sass setup.
I tend not to overdo this though, and have maintained my personal preference as to the extent of BEM usage overall.
You'll see what I mean when diving into the code.

## Initialization

Clone the contents of this repository into a folder on your computer. Open the command line in the root of this folder. Perform `npm install`. Alright, you are set to go!

## Usage

Open the command line in the root of your project folder. The base theme's Gulp file allows you to perform a couple of simple functions, or to start up a watcher which will run the appropriate function when changes occur to your files in predefined locations. It is recommended to simply use the watcher.

`gulp style`will compile your scss code into a single minified css file in the dist folder.
`gulp script`will compile your js code into a single minified js file in the dist folder.
`gulp images` will put minified copies of your images in the dist folder.

`gulp watch` will perform any of these scripts whenever a new or modified file is spotted in the appropriate locations in the src folder.

Let's take a short look at what is exactly happening in each of these scripts.

#### gulp style
- scss code is processed into css file code
- sourcemaps is applied for easy reference when checking the inspector in the browser
- errors are logged in the command line output
- prefixes are applied where necessary
- css code is optimized and minified

#### gulp script
- sourcemaps is applied for easy reference when checking the inspector in the browser
- the js code is run through a linter
- js code is minified

#### gulp images
- a minified copy of each image is made
- the command line output shows details on the minification

#### gulp watch
- will perform these functions on each (appropriate) change and reload the browser to show the changes without manually having to refresh the browser window

## Variables

The theme provides you with a number of default values in the *\_variables.scss file*. The idea is to first establish what variables are needed for whatever project you are working on, and changing the default variables accordingly in this file. When you do, remember to remove the default comment so you are aware the variable has been modified.

The variables are grouped in the following sections:
- **colours** has most common colour variables listed.
- **fonts** holds all things fonts & text. Please place imports (e.g. Google Fonts) on the top row of the file, though. We use a (non-Bootstrap) h0 class for a one-off main title for a project (in order not to lose the h1 tag for just one usage). Subtitles to headers are styled by using the secondary classes.
- **transition** is usually just one variable which determines the transition effect for the entire site, however if your project has a number of different transitions, this would be the place to add more variables.
- **box shadow** is usually just one variable which determines the box-shadow appearance for the entire site, however if your project has a number of different box-shadow setups, this would be the place to add more variables.
- **spacing** extends Bootstraps standard spacing variables, giving you more control over the existing variables and producing more of them. All Bootstrap padding and margin classes will be affected by modifying spacers map (either by multiplying the 1rem baseline or by defining these in pixels or rem), which makes this really powerful and useful. You can add more lines if needed as well. Please be adviced to keep this list logically laid out and in ascending order. If not, you might make paddings and margins less intuitive to work with, which should be avoided.

## Components

The index.html file contains a number of standard components in a "kitchen sink style". When in need for a component, check these out before heading over to the Bootstrap documentation. Chances are, the component has been incorporated here in a more customized way. If not, feel free to use Bootstrap components directly, of course. Components are constructed using BEM methodology whenever sensible.

