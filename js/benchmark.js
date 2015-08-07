/* benchmark.js
 * Simple ultra-lightweight tool that calculates elapsed time between checkpoints.
 * Author: Joshua Carter
 * Created: May 19, 2014
 * Version: 0.1.1
 */
(function () {
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