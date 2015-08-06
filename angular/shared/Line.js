/* Line.js
 * Creates a constructor that represents a 
 *  line (row, column, diagonal) of three boxes on the game board.
 * Dependencies: app module
 * Author: Joshua Carter
 * Created: August 06, 2015
 */
"use strict";
//create Box service constructor
var Line = function () {    
    return this;
};
//add box service to app
app.factory("Line", Line);