/* Line.js
 * Creates a constructor that represents a 
 *  line (row, column, diagonal) of three boxes on the game board.
 * Dependencies: app module
 * Author: Joshua Carter
 * Created: August 06, 2015
 */
"use strict";
//create Line service 
var LineService = function () {
    //create Line constructor
    var Line = function () {    
        
        //private static properties that define our line
        this._boxes = [];
        //private properties that define the state of our line
        this._winner = false;
        this._status = 'open';
        
        return this;
    };
    //add methods to our line constructor
    angular.extend(Line.prototype, {
        //updates the status of our line
        updateStatus: function () {
            //default to win
            var status = 'win',
                //track first play
                firstPlay = false;
            //loop through our boxes
            for (var i=0; i<this._boxes.length; i++) {
                //if the box is empty
                if (this._boxes[i].isEmpty()) {
                    //then there is no win, if our status isn't open yet 
                    if (status != 'open') {
                        //set status to open
                        status = 'open';
                    }
                }
                //else if there is no first play
                else if (!firstPlay) {
                    //this is our first play
                    firstPlay = this._boxes[i].getPlay();
                }
                //else if this is a different play than our first play
                else if (this._boxes[i].getPlay() != firstPlay) {
                    //then two players have both played in the same line, set status to draw
                    status = 'draw';
                    //the status is draw, stop checking any remaining boxes
                    break;
                }
            }
            //our status should be accurate now
            this._status = status;
            return status;
        },
        //get the status of our line:
        // - 'open': Only one or zero players have played in the line
        // - 'draw': Both players have played in the line
        // - 'win': One player has played in all three boxes in the line
        getStatus: function () {
            return this._status;    
        },
        //gets the boxes that this line belongs to
        boxes: function () {
            return this._boxes;    
        },
        //sets the boxes that this line belongs to (array of Box objects)
        setBoxes: function (boxes) {
            this._boxes = boxes;    
        }
    });
    //return Line constructor
    return Line;
};
//add line service to app
app.factory("Line", LineService);