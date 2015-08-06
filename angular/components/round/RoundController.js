/* RoundController.js 
 * Create controller class for single round of Tic-Tac-Toe.
 * Dependencies: app module, Board service
 * Author: Joshua Carter
 * Created: August 06, 2015
 */
"use strict";
//create round controlller constructor
var RoundController = function(board) {
    
};
//inject dependencies
RoundController.$inject = ["Board"];
//add controller to our app
app.controller("RoundController", RoundController);
