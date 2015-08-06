/* Box.js
 * Creates a constructor that represents a single box on the game board.
 * Dependencies: app module
 * Author: Joshua Carter
 * Created: August 06, 2015
 */
"use strict";
//create Box service constructor
var Box = function () {    
    
    //private properties to store the state of box
    this._content = '';    
    
    return this;
};
//add box service to app
app.factory("Box", Box);