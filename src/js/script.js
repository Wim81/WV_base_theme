$(document).ready( function() {

    // pp_slider_testimonial slider action
    $(".pp_slider_testimonial-wrapper").slick({
     infinite: true,
     speed: 300,
     slidesToShow: 1,
     });

    // pp_slider_slider-images slider action
    $(".slider-image-wrapper").slick({
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        dots: true
    });

    // pp_image_gallery interactive modal action
    if( $(".gallery a").length ) {
        var lightbox = $(".gallery a").simpleLightbox();
    }

    /* make form labels appear when there is input */
    $(".label-switch").keyup(function() {
        if ($(this).val() ) {
            $(this).prev().css("opacity", 1);
        } else {
            $(this).prev().css("opacity", 0);
        }
    });

    /* form select arrow movement on click */
    $("form .select-wrapper").on("click", function(e) {
       $(this).toggleClass("open");
       console.log(e.target);
    });

    /* form checkbox toggle */
    $("form .label-checkbox").on("click", function() {
       $(this).toggleClass("checked");
    });

    // form custom select box with selectize.js
    $(".form-select").selectize({
        create:  false
    });

    /* form show file name uploaded file */
    $('.file-input-action').bind('change', function() {
        var fileName = '';
        fileName = $(this).val();
        $(this).parent().find('.file-input-wrapper-filename').html(fileName);
    });

    /* animated hamburger menu class toggle */
    $('.hamburger').on("click", function() {
        $(this).toggleClass("is-active");
    });

    /* header large > mobile menu > show/hide levels 2&3 */
    $(".has-level2").on("click", function(e) {
        $(this).toggleClass("open");
        $(this).find(".primary-menu-level2").toggleClass("open");
        $(".has-level2").not($(this)).removeClass("open");
        $(".has-level2").not($(this)).find(".primary-menu-level2").removeClass("open");
        $(".has-level2").not($(this)).find(".has-level3").removeClass("open");
        $(".has-level2").not($(this)).find(".primary-menu-level3").removeClass("open");
    });
    $(".has-level3").on("click", function(e) {
        e.stopPropagation();
        $(this).toggleClass("open");
        $(this).find(".primary-menu-level3").toggleClass("open");
    });

    /* desktop header large > main nav 2nd level > add class to provide space of there are expendable items */
    $(".header-desktop-bottom .has-level3").parent().addClass("with-level3");

    /* open/close search field in header */
    $(".desktop-menu-search-logo").on("click", toggleSearchbox);
    $(".mobile-menu-top-search-logo").on("click", toggleSearchboxMobile);

    function toggleSearchbox() {
        $(".search-form-input").toggleClass("input-visible");
    }

    function toggleSearchboxMobile() {
        $(".search-form-input-mobile").toggleClass("input-visible");
    }

    // resize menu reset
    $(window).on('resize', function() {
        $(".navbar-toggler").attr("aria-expanded", false); // will reset classic Bootstrap burger menu
        $(".navbar-toggler").removeClass("is-active"); // will reset custom animated burger menu
        $(".primary-menu-level2").removeClass("open"); // close all 2nd level menus
        $(".primary-menu-level3").removeClass("open"); // close all 3rd level menus
        $(".has-level2").removeClass("open"); // reset handle which opens 2nd level menus
        $(".has-level3").removeClass("open"); // reset handle which opens 3rd level menus
        $(".collapse").removeClass("show"); // close 1st level menu
    });

    // large header desktop menu reset when clicking search
    $(".desktop-menu-search-logo").on("click", function() {
        $(".primary-menu-level2").removeClass("open"); // close all 2nd level menus
        $(".primary-menu-level3").removeClass("open"); // close all 3rd level menus
        $(".has-level2").removeClass("open"); // reset handle which opens 2nd level menus
        $(".has-level3").removeClass("open"); // reset handle which opens 3rd level menus
    });
});