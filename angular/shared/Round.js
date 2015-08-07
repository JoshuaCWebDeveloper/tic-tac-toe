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
        }
    });
    //return constructor
    return Round;
};
//inject dependencies
RoundService.$inject = ["Board"];
//add controller to our app
app.factory("Round", RoundService);
