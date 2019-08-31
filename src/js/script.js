$(document).ready( function() {

    console.log("JS file OK");

    $(".footer-mid").css("background-color", "red");

    $(".pp_slider_testimonials-item-wrapper").slick({
     infinite: true,
     speed: 300,
     slidesToShow: 1,
     adaptiveHeight: true
     });

});