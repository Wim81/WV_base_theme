$(document).ready( function() {


    var CountUp = function(target, startVal, endVal, decimals, duration, options) {

        var self = this;
        self.version = function () { return '1.9.3'; };

        // default options
        self.options = {
            useEasing: true, // toggle easing
            useGrouping: true, // 1,000,000 vs 1000000
            separator: ',', // character to use as a separator
            decimal: '.', // character to use as a decimal
            easingFn: easeOutExpo, // optional custom easing function, default is Robert Penner's easeOutExpo
            formattingFn: formatNumber, // optional custom formatting function, default is formatNumber above
            prefix: '', // optional text before the result
            suffix: '', // optional text after the result
            numerals: [] // optionally pass an array of custom numerals for 0-9
        };

        // extend default options with passed options object
        if (options && typeof options === 'object') {
            for (var key in self.options) {
                if (options.hasOwnProperty(key) && options[key] !== null) {
                    self.options[key] = options[key];
                }
            }
        }

        if (self.options.separator === '') {
            self.options.useGrouping = false;
        }
        else {
            // ensure the separator is a string (formatNumber assumes this)
            self.options.separator = '' + self.options.separator;
        }

        // make sure requestAnimationFrame and cancelAnimationFrame are defined
        // polyfill for browsers without native support
        // by Opera engineer Erik Möller
        var lastTime = 0;
        var vendors = ['webkit', 'moz', 'ms', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
        }
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }
        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
        }

        function formatNumber(num) {
            var neg = (num < 0),
                x, x1, x2, x3, i, len;
            num = Math.abs(num).toFixed(self.decimals);
            num += '';
            x = num.split('.');
            x1 = x[0];
            x2 = x.length > 1 ? self.options.decimal + x[1] : '';
            if (self.options.useGrouping) {
                x3 = '';
                for (i = 0, len = x1.length; i < len; ++i) {
                    if (i !== 0 && ((i % 3) === 0)) {
                        x3 = self.options.separator + x3;
                    }
                    x3 = x1[len - i - 1] + x3;
                }
                x1 = x3;
            }
            // optional numeral substitution
            if (self.options.numerals.length) {
                x1 = x1.replace(/[0-9]/g, function(w) {
                    return self.options.numerals[+w];
                })
                x2 = x2.replace(/[0-9]/g, function(w) {
                    return self.options.numerals[+w];
                })
            }
            return (neg ? '-' : '') + self.options.prefix + x1 + x2 + self.options.suffix;
        }
        // Robert Penner's easeOutExpo
        function easeOutExpo(t, b, c, d) {
            return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
        }
        function ensureNumber(n) {
            return (typeof n === 'number' && !isNaN(n));
        }

        self.initialize = function() {
            if (self.initialized) return true;

            self.error = '';
            self.d = (typeof target === 'string') ? document.getElementById(target) : target;
            if (!self.d) {
                self.error = '[CountUp] target is null or undefined'
                return false;
            }
            self.startVal = Number(startVal);
            self.endVal = Number(endVal);
            // error checks
            if (ensureNumber(self.startVal) && ensureNumber(self.endVal)) {
                self.decimals = Math.max(0, decimals || 0);
                self.dec = Math.pow(10, self.decimals);
                self.duration = Number(duration) * 1000 || 2000;
                self.countDown = (self.startVal > self.endVal);
                self.frameVal = self.startVal;
                self.initialized = true;
                return true;
            }
            else {
                self.error = '[CountUp] startVal ('+startVal+') or endVal ('+endVal+') is not a number';
                return false;
            }
        };

        // Print value to target
        self.printValue = function(value) {
            var result = self.options.formattingFn(value);

            if (self.d.tagName === 'INPUT') {
                this.d.value = result;
            }
            else if (self.d.tagName === 'text' || self.d.tagName === 'tspan') {
                this.d.textContent = result;
            }
            else {
                this.d.innerHTML = result;
            }
        };

        self.count = function(timestamp) {

            if (!self.startTime) { self.startTime = timestamp; }

            self.timestamp = timestamp;
            var progress = timestamp - self.startTime;
            self.remaining = self.duration - progress;

            // to ease or not to ease
            if (self.options.useEasing) {
                if (self.countDown) {
                    self.frameVal = self.startVal - self.options.easingFn(progress, 0, self.startVal - self.endVal, self.duration);
                } else {
                    self.frameVal = self.options.easingFn(progress, self.startVal, self.endVal - self.startVal, self.duration);
                }
            } else {
                if (self.countDown) {
                    self.frameVal = self.startVal - ((self.startVal - self.endVal) * (progress / self.duration));
                } else {
                    self.frameVal = self.startVal + (self.endVal - self.startVal) * (progress / self.duration);
                }
            }

            // don't go past endVal since progress can exceed duration in the last frame
            if (self.countDown) {
                self.frameVal = (self.frameVal < self.endVal) ? self.endVal : self.frameVal;
            } else {
                self.frameVal = (self.frameVal > self.endVal) ? self.endVal : self.frameVal;
            }

            // decimal
            self.frameVal = Math.round(self.frameVal*self.dec)/self.dec;

            // format and print value
            self.printValue(self.frameVal);

            // whether to continue
            if (progress < self.duration) {
                self.rAF = requestAnimationFrame(self.count);
            } else {
                if (self.callback) self.callback();
            }
        };
        // start your animation
        self.start = function(callback) {
            if (!self.initialize()) return;
            self.callback = callback;
            self.rAF = requestAnimationFrame(self.count);
        };
        // toggles pause/resume animation
        self.pauseResume = function() {
            if (!self.paused) {
                self.paused = true;
                cancelAnimationFrame(self.rAF);
            } else {
                self.paused = false;
                delete self.startTime;
                self.duration = self.remaining;
                self.startVal = self.frameVal;
                requestAnimationFrame(self.count);
            }
        };
        // reset to startVal so animation can be run again
        self.reset = function() {
            self.paused = false;
            delete self.startTime;
            self.initialized = false;
            if (self.initialize()) {
                cancelAnimationFrame(self.rAF);
                self.printValue(self.startVal);
            }
        };
        // pass a new endVal and start animation
        self.update = function (newEndVal) {
            if (!self.initialize()) return;
            newEndVal = Number(newEndVal);
            if (!ensureNumber(newEndVal)) {
                self.error = '[CountUp] update() - new endVal is not a number: '+newEndVal;
                return;
            }
            self.error = '';
            if (newEndVal === self.frameVal) return;
            cancelAnimationFrame(self.rAF);
            self.paused = false;
            delete self.startTime;
            self.startVal = self.frameVal;
            self.endVal = newEndVal;
            self.countDown = (self.startVal > self.endVal);
            self.rAF = requestAnimationFrame(self.count);
        };

        // format startVal on initialization
        if (self.initialize()) self.printValue(self.startVal);
    };



    /*********************************************************************/


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