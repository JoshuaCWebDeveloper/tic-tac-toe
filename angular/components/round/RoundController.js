/* RoundController.js 
 * Create controller class for single round of Tic-Tac-Toe.
 * Dependencies: app module, Round service
 * Author: Joshua Carter
 * Created: August 06, 2015
 */
"use strict";
//create round controlller constructor
var RoundController = function(Round) {
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
//inject dependencies
RoundController.$inject = ["Round"];
//add controller to our app
app.controller("RoundController", RoundController);
