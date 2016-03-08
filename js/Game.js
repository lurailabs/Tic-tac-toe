/**
 * Created by lurai on 6/3/16.
 */

var Game = function(level , pc, human) {

    var board           = null;
    var turn            = 'human';
    var currentState    = [];    // null for empty square, 'X' or 'O' for other
    var playing         = true;

    var player = {
        human:  human || 'O',
        pc:     pc || 'X'
    };

    var level   = level || 3;

    var getBoard = function() {
        return board;
    };

    var getCurrentState = function() {
        return currentState;
    };

    var isPlaying = function() {
        return playing;
    };


    /**
     * Updates currentState with new move.
     *
     * @param position  target square
     * @param token     'X' or 'O'
     */
    var commitMove = function(position, token) {
        currentState[position] = token;
        turn = turn === 'human' ? 'pc' : 'human';
        if (checkTerminal(currentState)) playing = false;
    }; // commitMove()

    /**
     * Returns an array with the numbers of all empty squares
     *
     * @param state
     * @returns {*}
     */
    var getPossibleMoves = function(state) {
        return state.reduce( function(prev, curr, index) {
            if (curr === null) prev.push(index);
            return prev;
        }, []);
    };


    /**
     * Checks if a given state is terminal.
     * * @param state
     *
     * @returns     false (is not terminal) / 'X' (X wins) / 'O' (O wins) / 'tie'
     */
    var checkTerminal = function(state) {

        var result = null,
            numOfFullSquares = state.reduce(function(prev, curr) {
                return curr !== null ? prev + 1 : prev;
            }, 0),
            i,
            tempArr = [];

        if (numOfFullSquares < level*2 - 1) return false;

        if (numOfFullSquares >= level * 2 - 1) {  // at least one of the 2 players must have played x times

            // check rows
            for (i = 0; i < state.length; i += level) {
                tempArr = state.slice(i, i+level);
                if ( result = checkArray(tempArr) ) return result;
            }
            // check columns
            for (i = 0; i < level; i++) {
                tempArr = [];
                for (var j = i; j < state.length; j += level) {
                    tempArr.push(state[j]);
                }
                if ( result = checkArray(tempArr) ) return result;
            }

            // check first diagonal
            tempArr = [];
            for (i = 0; i < state.length; i = level+i+1) {
                tempArr.push(state[i]);
            }
            if ( result = checkArray(tempArr) ) return result;

            //check second diagonal
            tempArr = [];
            for (i = state.length-level; i > 0; i = i-level+1) {
                tempArr.push(state[i]);
            }
            if ( result = checkArray(tempArr) ) return result;

        }
        if (numOfFullSquares === state.length) return 'tie';

        return false;

    };


    /**
     *  Aux function for checkTerminal()
     * @param   arr
     * @returns false, 'X', or 'O'
     */
    function checkArray(arr) {
        return arr.reduce(function(a, b){ return (a === b) ? a : false; });
    }


    /**
     * Creates board, draws it on the screen, resets array with positions
     */
    var init = function() {
        board = new Board(level);
        board.drawBoard();
        for (var i=0; i < level*level; i++) {
            currentState[i] = null;
        }
    };

    return {
        player:             player,
        turn:               turn,
        isPlaying:          isPlaying,
        getBoard:           getBoard,
        getCurrentState:    getCurrentState,
        init:               init,
        commitMove:         commitMove,
        getPossibleMoves:   getPossibleMoves,
        checkTerminal:      checkTerminal
    }
};