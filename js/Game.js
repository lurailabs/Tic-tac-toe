/**
 * Created by lurai on 6/3/16.
 */

/**
 * Represents the game. All logic except best pc move.
 *
 * @constructor
 */

var Game = function() {

    var board           = null;
    var turn            = 'pc';
    var currentState    = [];    // null for empty square, 'X' or 'O' for other
    var playing         = false;
    var level           = 3;
    var winningPosition = [];
    var winner          = null;

    var token = {
        human:  'O',
        pc:     'X'
    };


    /**
     * Creates board, draws it on the screen, resets positions array
     */
    var init = function() {
        board = new Board(level);
        board.drawBoard();
        winningPosition = [];
        winner = null;
        for (var i = 0; i < level*level; i++) {
            currentState[i] = null;
        }
    };

    var getBoard = function() {
        return board;
    };

    var getCurrentState = function() {
        return currentState;
    };

    var getTurn = function() {
        return turn;
    };

    var getLevel = function() {
        return level;
    };

    var getWinningPosition = function() {
        return winningPosition;
    };

    var getWinner = function() {
        return winner;
    };

    var getToken = function(humanOrPc) {
        return token[humanOrPc];
    };

    var setLevel = function(newLevel) {
        level = newLevel;
        init();
    };

    var setHuman = function(newToken) {
        token.human = newToken;
        if (newToken === 'X') {
            token.pc = 'O';
            turn = 'human';
        } else {
            token.pc = 'X';
            turn = 'pc';
        }
    };

    var isPlaying = function() {
        return playing;
    };

    var setPlaying = function(mode) {
        playing = mode;
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
    };


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
     * @param state
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

        // at least one of the 2 players must have played 'level' times
        if (numOfFullSquares >= level * 2 - 1) {

            // check rows
            for (i = 0; i < state.length; i += level) {
                tempArr = state.slice(i, i+level);
                winningPosition = [i, i+1, i+2];
                if ( result = checkArray(tempArr) ) {
                    winningPosition = [i, i+1, i+2];
                    if (level === 4) winningPosition.push(i+3);
                    winner = result;
                    return result;
                }
            }
            // check columns
            for (i = 0; i < level; i++) {
                tempArr = [];
                for (var j = i; j < state.length; j += level) {
                    tempArr.push(state[j]);
                }
                if ( result = checkArray(tempArr) ) {
                    winningPosition = level === 3 ? [i, i+3, i+6] : [i, i+4, i+8, i+12];
                    winner = result;
                    return result;
                }
            }

            // check first diagonal
            tempArr = [];
            for (i = 0; i < state.length; i = level+i+1) {
                tempArr.push(state[i]);
            }
            if ( result = checkArray(tempArr) ) {
                winningPosition = level=== 3 ? [0, 4, 8] : [0, 5, 10, 15];
                winner = result;
                return result;
            }

            //check second diagonal
            tempArr = [];
            for (i = state.length-level; i > 0; i = i-level+1) {
                tempArr.push(state[i]);
            }
            if ( result = checkArray(tempArr) ) {
                winningPosition = level=== 3 ? [2, 4, 6] : [3, 6, 9, 12];
                winner = result;
                return result;
            }

        }
        if (numOfFullSquares === state.length) {
            winningPosition = null;
            winner = null;
            return 'tie';
        }

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


    init();


    return {
        getToken:           getToken,
        getTurn:            getTurn,
        getWinningPosition: getWinningPosition,
        getWinner:          getWinner,
        getLevel:           getLevel,
        setLevel:           setLevel,
        setHuman:           setHuman,
        isPlaying:          isPlaying,
        setPlaying:         setPlaying,
        getBoard:           getBoard,
        getCurrentState:    getCurrentState,
        commitMove:         commitMove,
        getPossibleMoves:   getPossibleMoves,
        checkTerminal:      checkTerminal
    }
};