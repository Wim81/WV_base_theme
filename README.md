# WV base theme v1.1

## Introduction

Welcome to the documentation of my personal front-end base theme. This theme is my "big bag of often needed front-end stuff", which saves me a lot of time when developing new sites. As such, this is an always evolving base theme, for which I will periodically put out a new "release". This is version 1.1.

This theme uses the following technologies/frameworks/libraries:

- **Sass** for CSS preprocessing
- **Bootstrap** as a front-end framework and the basis upon which I built my personal styles
- **FontAwesome** for all things icons
- **Gulp** for automation
- **jQuery** because I still like it, even in this day and age, for writing simpler Javascript

This theme contains a few pages which show all default components.
The idea is to take this as a easy starting point for new projects, having some of the most common components and styling structures already in place.

This base theme has a lot of default values. These should be overwritten. When you do, please remove the *//default* comment.

In general, a kind-of-BEM methodology has been used in the Sass setup.
I tend not to overdo this though, and have maintained my personal preference as to the extent of BEM usage overall.
You'll see what I mean when diving into the code.

## New features in v1.1
The following features have been added in v1.1:
- image slider
- image gallery with interactive modal
- customized select elements in forms
- landing page template with sidebar
- landing page header & footer
- complex header, incl. 3 navs, 3 levels in main nav, searchbar, language switch
- sticky header action which reacts to scroll
- animated hamburger menu's

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
- only new or modified images are affected, which makes the process faster

#### gulp watch
- will perform these functions on each (appropriate) change and reload the browser to show the changes without manually having to refresh the browser window

## Variables

The theme provides you with a number of default values in the *\_variables.scss file*. The idea is to first establish what variables are needed for whatever project you are working on, and changing the default variables accordingly in this file. When you do, remember to remove the default comment so you are aware the variable has been modified.

The variables are grouped in the following sections:
- **colours** has most common colour variables listed.
- **fonts** holds all things fonts & text. Please place imports (e.g. Google Fonts) on the top row of the file, though. We use a (non-Bootstrap) h0 class for a one-off main title for a project (in order not to lose the h1 tag for just one usage). Subtitles to headers are styled by using the secondary classes.
- **buttons** just has a few standard variables for all buttons, so they always look in line with each other. For alternative stylings, you can choose to add variables here and use them wherever possible, or add those variables in the buttons scss file. Whichever way works best for you, will be just fine.
- **transition** is usually just one variable which determines the transition effect for the entire site, however if your project has a number of different transitions, this would be the place to add more variables.
- **box shadow** is usually just one variable which determines the box-shadow appearance for the entire site, however if your project has a number of different box-shadow setups, this would be the place to add more variables.
- **spacing** extends Bootstraps standard spacing variables, giving you more control over the existing variables and producing more of them. All Bootstrap padding and margin classes will be affected by modifying spacers map (either by multiplying the 1rem baseline or by defining these in pixels or rem), which makes this really powerful and useful. You can add more lines if needed as well. Please be adviced to keep this list logically laid out and in ascending order. If not, you might make paddings and margins less intuitive to work with, which should be avoided.
- **slider** keeps some variables to manipulate the elements using a slider
- **landing page sidebar** has some variables to quickly modify the sidebar on the landing page
- **social block** keeps variables to manipulate social icons in one place

## Components

The standard components have been split in a couple of pages:
- **basic components** are the most basic elements like headers, buttons, links & lists. Also included here are breadcrumbs and paginations. This page also shows the "show header on scroll up" functionality.
- **page parts** are the most commonly used components to put together a web page, e.g. by using a CMS.
- **views** show a number of teasers and cards, which are laid out in views
- **forms** show form elements
- **landing page** shows the default landing page setup, with custom header, footer and intro section with sidebar
- **large header** shows a more complex header setup. For any header (default, large or landing page), simply add "header-sticky-scroll" class to make the header appear on a scroll-up action

When in need for a component, check these out before heading over to the Bootstrap documentation. Chances are, the component has been incorporated here in a more customized way. If not, feel free to use Bootstrap components directly, of course. Components are constructed using BEM methodology whenever sensible.

These components use the overall variables to style its contents where possible, but will often use specific styling which is located in the /scss/custom/partials and /scss/custom/page-parts folders. Feel free to modify these files to your liking. We recommend you just rename the original file, make your own new file (with the original file's initial name) and place your own styling code in there by copying the parts you can use from the original and adding your own. If you want to take this even further, you can rename the partials folder in its entirety and make a new partials folder and build the underlying files from scratch. Whichever way works best for you.

## Mixins

A number of mixins has been added to make some standard styling situations easier & quicker to implement. The following custom mixins can be used:

- `full-width`: from within whichever container you can make sure your div is full-width by applying this mixin. Typically very handy for page parts which need a full width background image or background color.
- `font`: this mixin is extensively used in the typography file and combines a number of font/text variables which are common.
- `bg-img`: this mixin quickly applies the typical background image setup no-repeat/cover/center.
- `bg-img-contain`: same thing, but instead of covering the div, the image is contained in it

## Utility classes

Sometimes you just want to quickly add a class for a recurring effect. On top of Bootstrap's utility classes, there are a few custom ones in the theme.

- `bg-[COLOR]`: a number of classes to quickly modify an element's background-colour and some of its contents.
- `overlay classes`: quickly apply an overlay effect on an element, and make sure all of its contents are put on top of that overlay.


## So that's it for now...
But - as stated before - this is an always evolving theme. At some stage, I will mention planned functionality for v1.2 here, but that's for later.
