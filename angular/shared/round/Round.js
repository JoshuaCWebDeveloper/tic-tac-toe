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
        this._gameOver = false;
        this._playCount = 1;
        //setup Round
        this.init(Board);
        
    };
    //add methods to our Round constructor
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
                unplayed = true,
                boxIndex, currentBox, boxLines;
            do {
                //randomly select empty box to play in
                boxIndex = Math.floor(Math.random() * emptyBoxes.length);
                currentBox = emptyBoxes[boxIndex];
                //if we successfully make a play
                if (currentBox.setPlay(play)) {
                    //don't loop again
                    unplayed = false;
                }
                //the box is no longer be empty
                emptyBoxes = this.board().fillBox(boxIndex);
                //in case our box wasn't empty or the play wasn't otherwise successful, 
                //keep trying until we find an empty one
            }
            while (unplayed);
            //get the lines of our chosen box
            boxLines = currentBox.lines();
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
        },
        //starts game loop that executes until game is over
        //will return the result of the game, either 'X' (winner), 'O' (winner), or 'draw'
        start: function () {
            //initialize game variables
            //initialize player and opponent, X moves first
            var player = 'X',
                opponent = 'O',
                swap;
            //start the loop
            while (!this._gameOver && this._playCount < 10) {
                //have the player take a turn, if they win
                if (this.takeTurn(player)) {
                    //we have a winner!
                    return player;
                }   //else, the player lost, 
                //if we are more than halfway through, check and see if there are still open lines
                //if there are no open lines, it is a draw, stop playing, it's pointless
                if (this._playCount > 4 && !this.board().openLines()) {
                    return 'draw';
                }
                //swap player and opponent
                swap = player, player = opponent, opponent = swap;
                //increment the play count
                this._playCount++;
            }
            //if we made it this far, something went wrong, just return draw
            return 'draw';
        }
    });
    //return constructor
    return Round;
};
//inject dependencies
RoundService.$inject = ["Board"];
//add service to our app
app.factory("Round", RoundService);
