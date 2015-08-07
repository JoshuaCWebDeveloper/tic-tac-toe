/* Board.js
 * Creates a constructor that represents the game board.
 * Dependencies: app module, Line service, Box service
 * Author: Joshua Carter
 * Created: August 06, 2015
 */
"use strict";
//create Board service 
var BoardService = function (Line, Box) {
    //create Board constructor
    var Board = function () {
        
        //public properties
        //create names to use when referencing boxes
        this.boxNames = ['A1', 'A2', 'A3', 
                        'B1', 'B2', 'B3', 
                        'C1', 'C2', 'C3'];
        //create name to use when referencing lines 
        //(three rows, three columns, two diagonals)
        this.lineNames = ['A', 'B', 'C', '1', '2', '3', 'ABC', '123'];
            
        //private properties that define board
        this._boxes = {};
        this._lines = {};
        this._emptyBoxes = [];
        //setup board
        this.init(Line, Box);
         
        return this;
    };
    //add methods to our Board constructor
    angular.extend(Board.prototype, {
        //method that creates the lines and boxes and layout for our board
        init: function (Line, Box) {
            var newBox;
            //create boxes
            for (var i=0; i<this.boxNames.length; i++) {
                newBox = new Box();
                this._boxes[this.boxNames[i]] = newBox;
                //Add to empty boxes
                this._emptyBoxes.push(newBox);
            }
            //create lines
            for (var i=0; i<this.lineNames.length; i++) {
                this._lines[this.lineNames[i]] = new Line();
            }
            
            //setup layout of lines and boxes (used for game logic)
            this._boxes.A1.setLines(this.matchLines(['A', '1', 'ABC']));
            this._boxes.A2.setLines(this.matchLines(['A', '2']));
            this._boxes.A3.setLines(this.matchLines(['A', '3', '123']));
            this._boxes.B1.setLines(this.matchLines(['B', '1']));
            this._boxes.B2.setLines(this.matchLines(['B', '2', 'ABC', '123']));
            this._boxes.B3.setLines(this.matchLines(['B', '3']));
            this._boxes.C1.setLines(this.matchLines(['C', '1', '123']));
            this._boxes.C2.setLines(this.matchLines(['C', '2']));
            this._boxes.C3.setLines(this.matchLines(['C', '3', 'ABC']));
            
            this._lines.A.setBoxes(     this.matchBoxes(['A1', 'A2', 'A3']) );
            this._lines.B.setBoxes(     this.matchBoxes(['B1', 'B2', 'B3']) );
            this._lines.C.setBoxes(     this.matchBoxes(['C1', 'C2', 'C3']) );
            this._lines['1'].setBoxes(  this.matchBoxes(['A1', 'B1', 'C1']) );
            this._lines['2'].setBoxes(  this.matchBoxes(['A2', 'B2', 'C2']) );
            this._lines['3'].setBoxes(  this.matchBoxes(['A3', 'B3', 'C3']) );
            this._lines.ABC.setBoxes(   this.matchBoxes(['A1', 'B2', 'C3']) );
            this._lines['123'].setBoxes(this.matchBoxes(['C1', 'B2', 'A3']));
        },
        //method to retrieve array of lines that match given array of line names
        matchLines: function (lineNames) {
            //store matched lines
            var lines = [];
            for (var i=0; i<lineNames.length; i++) {
                //if the name matches a line
                if (typeof this._lines[lineNames[i]] != "undefined") {
                    lines.push(this._lines[lineNames[i]]);
                }
            }  
            return lines;  
        },
        //method to retrieve array of boxes that match given array of box names
        matchBoxes: function (boxNames) {
            //store matched boxes
            var boxes = [];
            for (var i=0; i<boxNames.length; i++) {
                //if the name matches a box
                if (typeof this._boxes[boxNames[i]] != "undefined") {
                    boxes.push(this._boxes[boxNames[i]]);
                }
            }
            return boxes;   
        },
        //returns the boxes of this board
        boxes: function () {
            return boxes;
        },
        //returns an array of empty boxes
        getEmptyBoxes: function () {
            return this._emptyBoxes;   
        },
        //removes a box from the array of empty boxes
        fillBox: function (index) {
            this._emptyBoxes.splice(index, 1);  
        }
    });
    //return Board constructor
    return Board;
};
//inject dependencies
BoardService.$inject = ["Line", "Box"];
//add Board service to app
app.factory("Board", BoardService);