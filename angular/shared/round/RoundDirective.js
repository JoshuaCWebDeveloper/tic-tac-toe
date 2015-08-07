/* RoundDirective.js
 * Controls and outputs everything for a round using the RoundTemplate.html
 * Dependencies: app module, Round service
 * Author: Joshua Carter
 * Created: August 06, 2014
 */
"use strict";
//create controller function for round
var RoundController = function(Round) {
    console.log('controller');
    var board, curRow;
    //create round
    this.round = new Round();
    //create reference to round board
    board = this.round.board();
    //collect boxes into an ordered array of rows (left to right, top to bottom)
    this.boxes = [];
    //loop through ordered box names
    for (var i=0; i<board.boxNames.length; i++) {
        if (i % 3 == 0) {
            this.boxes.push([]);
            curRow = this.boxes[this.boxes.length - 1];
        }
        curRow.push(board.matchBoxes([board.boxNames[i]])[0]);
    }
    //start playing the current round, store the result
    this.result = this.round.start();
};
//inject dependencies into controller
RoundController.$inject = ["Round"];
//create directive for round and add to app
app.directive("roundView", function () {
    return {
        restrict: 'E',
        scope: {},
        controller: RoundController,
        controllerAs: 'roundInfo',
        templateUrl: 'angular/shared/round/RoundTemplate.html'
    };
});
 