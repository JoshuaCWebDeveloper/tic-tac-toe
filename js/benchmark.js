/* benchmark.js
 * Simple ultra-lightweight tool that calculates elapsed time between checkpoints.
 * Author: Joshua Carter
 * Created: May 19, 2014
 * Version: 0.1
 */
(function () {
    var newDate = new Date();
    window.benchmark = {
        start: newDate,
        lastCalc: newDate,
        getTotalTime: function (from) {
            return from.getTime() - this.start.getTime();
        },
        getCurTime: function (from) {
            return from.getTime() - this.lastCalc.getTime();
        },
        calcElapsed: function () {
            var now = new Date(),
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