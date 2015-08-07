/* Round.js 
 * Create constructor that represnets single round of Tic-Tac-Toe.
 * Dependencies: app module, Board service
 * Author: Joshua Carter
 * Created: August 06, 2015
 */
"use strict";
//create round service
var RoundService = function (Board) {
    //create round constructor
    var Round = function() {
        
        //private properties that store state of our Round
        this._board = null;
        //setup Round
        this.init(Board);
        
    };
    //add methods to our RoundController constructor
    angular.extend(Round.prototype, {
        //sets up the round
        init: function (Board) {
            //create the board
            this._board = new Board();
            
        },
        //returns the board object for this round
        board: function () {
            return this._board;    
        },
        //takes a turn at play (places either an 'X' or 'O' in an empty box)
        takeTurn: function (play) {
            //get empty boxes
            var emptyBoxes = this.board().getEmptyBoxes(), 
                boxIndex, boxLines;
            do {
                //randomly select empty box to play in
                boxIndex = Math.floor(Math.random() * emptyBoxes.length);
                //the box will no longer be empty
                this.board().fillBox(boxIndex);
                //in case our box wasn't empty or the play wasn't otherwise successful, 
                //keep trying until we find an empty one
            }
            while (!emptyBoxes[boxIndex].setPlay(play));
            //get the lines of our chosen box
            boxLines = emptyBoxes[boxIndex].lines();
            //loop through the box's lines
            for (var i=0; i<boxLines.length; i++) {
                //update the status of the line, if we won
                if (boxLines[i].updateStatus() == 'win') {
                    //stop everything, we won!
                    return true;
                }
            }
            //we didn't win, so return false
            return false;
        }
    });
    //return constructor
    return Round;
};
//inject dependencies
RoundService.$inject = ["Board"];
//add controller to our app
app.factory("Round", RoundService);
