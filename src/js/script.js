$(document).ready( function() {

    // pp_slider_testimonial slider action
    $(".pp_slider_testimonial-wrapper").slick({
     infinite: true,
     speed: 300,
     slidesToShow: 1,
     });

    //pp_facts counter action
    var facts = [];

    function getValues() {

        var fact1 = $(".fact-number").eq(0).html();
        var fact2 = $(".fact-number").eq(1).html();
        var fact3 = $(".fact-number").eq(2).html();
        facts = [fact1, fact2, fact3];

        //return facts;
        console.log(facts);
    }

    function resetValues() {
        $('.fact-number').each(function() {
            $(this).html("");
        });
    }

    getValues();
    resetValues();

    function doTheCount() {

        var fact1 = facts[0];
        var fact2 = facts[1];
        var fact3 = facts[2];

        var factCount1 = $(".fact-number")[0];
        var factCount2 = $(".fact-number")[1];
        var factCount3 = $(".fact-number")[2];

        var options = {
            useEasing: true,
            useGrouping: true,
            separator: '.',
            decimal: ','
        };

        var demo1 = new CountUp(factCount1, 0, fact1, 0, 2, options);
        if (!demo1.error) {
            setTimeout(function() {
                demo1.start();
            }, 250);
        } else {
            console.error(demo1.error);
        }

        var demo2 = new CountUp(factCount2, 0, fact2, 0, 2, options);
        if (!demo2.error) {
            setTimeout(function() {
                demo2.start();
            }, 750);
        } else {
            console.error(demo2.error);
        }

        var demo3 = new CountUp(factCount3, 0, fact3, 0, 2, options);
        if (!demo3.error) {
            setTimeout(function() {
                demo3.start();
            }, 1250);
        } else {
            console.error(demo3.error);
        }
    }

    /* set counter */
    var factsAnimationCounter = 0;

    /*  check whether div is in view  */
    function VisibilityMonitor(element, showfn, hidefn) {
        var isshown= false;
        function check() {
            if (rectsIntersect(getPageRect(), getElementRect(element)) !== isshown) {
                isshown= !isshown;
                isshown? showfn() : hidefn();
            }
        };
        window.onscroll=window.onresize= check;
        check();
    }

    function getPageRect() {
        var isquirks= document.compatMode!=='BackCompat';
        var page= isquirks? document.documentElement : document.body;
        var x= page.scrollLeft;
        /* var y= page.scrollTop; */  /* change WV (original code iPhone/iPad incompatible */
        var y= Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
        /* change WV (original code iPhone/iPad incompatible */
        var w= 'innerWidth' in window? window.innerWidth : page.clientWidth;
        var h= 'innerHeight' in window? window.innerHeight : page.clientHeight;
        return [x, y, x+w, y+h];
    }

    function getElementRect(element) {
        var x= 0, y= 0;
        var w= element.offsetWidth, h= element.offsetHeight;
        while (element.offsetParent!==null) {
            x+= element.offsetLeft;
            y+= element.offsetTop;
            element= element.offsetParent;
        }
        return [x, y, x+w, y+h];
    }

    function rectsIntersect(a, b) {
        return a[0]<b[2] && a[2]>b[0] && a[1]<b[3] && a[3]>b[1];
    }

    // let's bring it all together
    if( document.getElementById('pp_facts') !== null ) {
        console.log("yes, we should animate want pp_facts aanwezig")

        VisibilityMonitor(
            document.getElementById('pp_facts'),
            function () {
                if (factsAnimationCounter == 0) {
                    doTheCount();
                    factsAnimationCounter++;
                } else {
                    // if counting animation has been triggered once since page load
                    // it will not be triggered a second time
                }
            },
            function () {
            }
        );
    }
});