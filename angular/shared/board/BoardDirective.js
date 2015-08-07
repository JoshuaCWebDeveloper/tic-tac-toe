/* BoardDirective.js
 * Outputs the board using the BoardTemplate.html
 * Dependencies: app module
 * Author: Joshua Carter
 * Created: August 06, 2014
 */
"use strict";
//create directive for board and add to app
app.directive("boardView", function () {
    return {
        restrict: 'E',
        scope: {
            info: '='
        },
        templateUrl: 'angular/shared/board/BoardTemplate.html'
    };
});
 