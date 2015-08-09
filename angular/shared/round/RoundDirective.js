/* RoundDirective.js
 * Controls and outputs everything for a round using the RoundTemplate.html
 * Dependencies: app module, Round service
 * Author: Joshua Carter
 * Created: August 06, 2014
 */
"use strict";
//create map of column strikethrough line positions (for indicating win)
//lineName: [x1, y1, x2, y2] (in relation to SVG canvas)
var winStrikethroughs = {
    'A': ['0', '16.66%', '100%', '16.66%'], 
    'B': ['0', '50%',    '100%', '50%'], 
    'C': ['0', '83.33%', '100%', '83.33%'], 
    '1': ['16.66%', '0', '16.66%', '100%'], 
    '2': ['50%',    '0', '50%',    '100%'], 
    '3': ['83.33%', '0', '83.33%', '100%'], 
    'ABC': ['0', '0',    '100%', '100%'], 
    '123': ['0', '100%', '100%', '0']
};
//create controller function for round
var RoundController = function($scope) {
    //get current round and result from $scope
    var round = $scope.info.round,
        result = $scope.info.result, 
        //create reference to round board
        board = round.board(),
        //get winning line
        winningLine = round.getWinningLine(),
        //collect boxes into an ordered array of rows (left to right, top to bottom)
        boxes = [], curRow;
    //loop through ordered box names
    for (var i=0; i<board.boxNames.length; i++) {
        if (i % 3 == 0) {
            boxes.push([]);
            curRow = boxes[boxes.length - 1];
        }
        curRow.push(board.matchBoxes([board.boxNames[i]])[0]);
    }
    //add info to scope using controller as syntax
    this.result = result;
    this.boxes = boxes;
};
//inject scope into controller
RoundController.$inject = ["$scope"];
//create directive for round and add to app
app.directive("roundView", function () {
    return {
        restrict: 'E',
        scope: {
            info: '='
        },
        controller: RoundController,
        controllerAs: 'roundInfo',
        templateUrl: 'angular/shared/round/RoundTemplate.html'
    };
});
 