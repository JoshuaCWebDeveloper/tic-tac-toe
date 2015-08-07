/* benchmark.js
 * Simple ultra-lightweight tool that calculates elapsed time between checkpoints.
 * Author: Joshua Carter
 * Created: May 19, 2014
 * Version: 0.1.2
 */
(function () {
    
    /* Use perfnow to support older browsers, BEGIN perfnow *****/
    /**
     * @file perfnow is a 0.14 kb window.performance.now high resolution timer polyfill with Date fallback
     * @author Daniel Lamb <dlamb.open.source@gmail.com>
     */
    // make sure we have an object to work with
    if (!('performance' in window)) {
        window.performance = {};
    }
    var perf = window.performance;
    // handle vendor prefixing
    window.performance.now = perf.now ||
        perf.mozNow ||
        perf.msNow ||
        perf.oNow ||
        perf.webkitNow ||
        // fallback to Date
        Date.now || function () {
            return new Date().getTime();
        };
    /**** END perfnow *****/
    
    var newTime = window.performance.now();
    window.benchmark = {
        start: newTime,
        lastCalc: newTime,
        getTotalTime: function (from) {
            return from - this.start;
        },
        getCurTime: function (from) {
            return from - this.lastCalc;
        },
        calcElapsed: function () {
            var now = window.performance.now(),
                curElaps = [this.getCurTime(now), this.getTotalTime(now)];
            //reset lastCalc
            this.lastCalc = now;
            return curElaps;
        },
        outputStatus: function () {
            var curStats = this.calcElapsed();
            return " -> " + curStats[0] + " (" + curStats[1] + ")";	
        }
    };
})();