/**
 * Created by lurai on 6/3/16.
 */

/**
 * Represents the graphical board and interacts with it.
 *
 * @param level     the size of the board (level 3 = 3*3 board)
 *
 * @constructor
 */
var Board = function(level) {

    /**
     * Draws a level x level board on the screen
     */
    var drawBoard = function() {

        var boardString = '';

        for (var i = 0; i < level; i++) {

            boardString += '<tr>';

            for (var j = 0; j < level; j++) {
                boardString += '<td class="c-' + (i * level + j) + '"></td>';
            }

            boardString += '</tr>';
        }

        $board.innerHTML = boardString;

    }; // drawBoard()


    /**
     * Sets all board squares to null
     */
    var reset = function() {

        $board.innerHTML = '';
        drawBoard();

    }; // reset()

    /**
     * Draws 'X' or 'Y' in a given board square.

     *
     * @param position   square number or HTMLTableCellElement object
     * @param token      'X' or 'O'
     *
     * @returns true if token is painted. False if not.
     */
    var drawToken = function($square, token) {

        if (!isNaN($square)) {      // square number passed as argument
            $square = document.getElementsByClassName('c-' + $square)[0];
        }

        if ($square.innerHTML === '') {
            $square.innerHTML = token;
            return true;

        } else return false;

    }; // drawToken()

    var highlightSquare = function(squareNumber) {
        var $square = document.getElementsByClassName('c-' + squareNumber)[0];
        $square.classList.add('highlight');
    };


    return {
        drawBoard:          drawBoard,
        drawToken:          drawToken,
        highlightSquare:    highlightSquare
    }

}; // Board