/* RoundController.js 
 * Create controller class for single round of Tic-Tac-Toe.
 * Dependencies: app module, Round service
 * Author: Joshua Carter
 * Created: August 06, 2015
 */
"use strict";
//create round controlller constructor
var RoundController = function(Round) {

    //create round
    this.round = new Round();
    
};
//inject dependencies
RoundController.$inject = ["Round"];
//add controller to our app
app.controller("RoundController", RoundController);
