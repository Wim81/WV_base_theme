// apply class "header-sticky-scroll" to the header element
// in order to apply the script below
// which will make the header appear on scroll-up

$(document).ready( function() {

    // variables
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $(".header-sticky-scroll").outerHeight();
    var navbarHeightMinus = 0 - navbarHeight;
    var didScroll;

    // since we will position the header fixed, we need to add the (calculated) height of it as padding-top to the next element so it does not collapse
    var elementAfterHeader = $(".header-sticky-scroll").next();
    elementAfterHeader.css("padding-top", navbarHeight);

    // let's make sure the class for hiding the header has the correct height as well
    $(".nav-up").css("top", navbarHeightMinus);

    // on scroll, let the interval function know the user has scrolled
    $(window).scroll(function(event){
        didScroll = true;
    });

    // run hasScrolled() and reset didScroll status
    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {

        var navbarHeight = $(".header-sticky-scroll").outerHeight();
        var navbarHeightMinus = 0 - navbarHeight;

        var st = $(window).scrollTop();

        if (Math.abs(lastScrollTop  -  st) <= delta) {
            return;
        }

        // If current position > last position AND scrolled past navbar...
        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down
            $(".header-sticky-scroll").removeClass("nav-down").addClass("nav-up");
            $(".nav-up").css("top", navbarHeightMinus);
        } else {
            // Scroll Up
            // If did not scroll past the document (possible on mac)...
            if(st + $(window).height() < $(document).height()) {
                $(".header-sticky-scroll").removeClass("nav-up").addClass("nav-down");
                $(".nav-down").css("top", 0);
            }
        }

        lastScrollTop = st;
    }

    // resize calculations
    $(window).on('resize', function(){
        var navbarHeight = $("header").outerHeight();
        var navbarHeightMinus = 0 - navbarHeight;
        var elementAfterHeader = $("header").next();
        elementAfterHeader.css("padding-top", navbarHeight);
    });

});