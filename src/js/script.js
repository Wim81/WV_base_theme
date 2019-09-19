$(document).ready( function() {

    // pp_slider_testimonial slider action
    $(".pp_slider_testimonial-wrapper").slick({
     infinite: true,
     speed: 300,
     slidesToShow: 1,
     });

    /* make form labels appear when there is input */
    $(".label-switch").keyup(function() {
        if ($(this).val() ) {
            $(this).prev().css("opacity", 1);
        } else {
            $(this).prev().css("opacity", 0);
        }
    })

    /* form select arrow movement on click */
    $("form .select-wrapper").on("click", function(e) {
       $(this).toggleClass("open");
       console.log(e.target);
    });

    /* form checkbox toggle */
    $("form .label-checkbox").on("click", function() {
       $(this).toggleClass("checked");
    });

    /* form show file name uploaded file */
    $('.file-input-action').bind('change', function() {
        var fileName = '';
        fileName = $(this).val();
        $(this).parent().find('.file-input-wrapper-filename').html(fileName);
    });

});