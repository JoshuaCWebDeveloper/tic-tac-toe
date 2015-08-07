/* GameDirective.js
 * Controls and outputs everything for the game
 * Dependencies: app module, Game service
 * Author: Joshua Carter
 * Created: August 07, 2014
 */
"use strict";
//create controller function for game
var GameController = function(Game) {
    //create game
    var game = new Game(); 
    //init info
    this.rounds = [];
    this.score = {};
    this.numRounds = 0;
    //method to start game
    this.start = function () {
        //take benchmark checkpoint
        benchmark.calcElapsed();
        //setup game
        game.init();
        //store game rounds
        this.rounds = game._rounds;
        //start game
        game.start();
        //get score
        this.scores = {
            'X': game.getScore('X'),
            'O': game.getScore('O')
        };
        //count number of rounds
        this.numRounds = this.rounds.length;
        //store amount of time it took to play game
        this.timeLength = benchmark.calcElapsed()[0];
    };
};
//inject dependencies into controller
GameController.$inject = ["Game"];
//create directive for round and add to app
app.directive("gameView", function () {
    return {
        restrict: 'E',
        scope: {},
        controller: GameController,
        controllerAs: 'gameInfo',
        templateUrl: 'angular/components/game/GameTemplate.html'
    };
});
 