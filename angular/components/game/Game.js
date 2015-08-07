/* Game.js 
 * Create constructor that represents the game.
 * Dependencies: app module, Round service
 * Author: Joshua Carter
 * Created: August 07, 2015
 */
 "use strict";
 //create game service
 var GameService = function (Round) {
     //create game constructor
     var Game = function () {
         
         //private properties that define instance of a game
         this._rounds = [];
         this._scores = {};
         
     };
     //add methods to our game constructor
     angular.extend(Game.prototype, {
        //gets the game rounds
        getRounds: function () {
            return this._rounds;
        },
        //gets the game score for the specified player
        getScore: function (player) {
            return this._scores[player];
        },
        //sets up a new game
        init: function () {
            //reset rounds
            this._rounds = [];
            //reset scores
            this._scores = {
                'X': 0,
                'O': 0
            };
        },
        //starts the game
        start: function () {
            var round, result;
            //play until someone scores 10
            while (this._scores.X < 10 && this._scores.O < 10) {
                //create a new round
                round = new Round();
                //play the round, get result
                result = round.start();
                //if the game wasn't a draw
                if (result != 'draw') {
                    //if x won, score point to X, else score point to O
                    (result == 'X') ? this._scores.X++ : this._scores.O++;
                }
                //add round to collection
                this._rounds.push({
                    round: round,
                    result: result
                });
            }
        }
     });
     //return constructor
     return Game;
 };
//inject dependencies into service
GameService.$inject = ["Round"];
//add service to our app
app.factory("Game", GameService);
