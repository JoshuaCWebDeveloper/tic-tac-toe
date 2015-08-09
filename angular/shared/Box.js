/* Box.js
 * Creates a constructor that represents a single box on the game board.
 * Dependencies: app module
 * Author: Joshua Carter
 * Created: August 06, 2015
 */
"use strict";
//create Box service
var BoxService = function () {
    //create Box constructor
    var Box = function (name) {    
        
        //private static properties that define our box
        this._lines = [];
        this._name = name;
        //private properties to store the state of box
        this._content = '';    
        
        return this;
    };
    //add methods to box constructor
    angular.extend(Box.prototype, {
        //gets the boxes name
        getName: function () {
            console.log(this._name);
            return this._name;
        },
        //returns true if box is empty, false if not
        isEmpty: function () {
            //if we are empty
            if (this._content == '') {
                return true;
            }
            return false;
        },
        //returns the play that has been made on the box ('X' or 'O'), 
        //false if empty
        getPlay: function () {
            //if we aren't empty
            if (!this.isEmpty()) {
                return this._content;
            }
            return false;
        },
        //sets the play ('X' or 'O') on an empty box, if we aren't empty returns false
        setPlay: function (play) {
            //if we are empty
            if (this.isEmpty()) {
                this._content = play;
                return play;
            }
            return false;
        },
        //gets the lines that this box belongs to
        lines: function () {
            return this._lines;    
        },
        //sets the lines that this box belongs to (array of Line objects)
        setLines: function (lines) {
            this._lines = lines;    
        }
    });
    //return Box constructor
    return Box;
};
//add box service to app
app.factory("Box", BoxService);