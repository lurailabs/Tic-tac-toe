/**
 * Created by lurai on 6/3/16.
 */

var game    = new Game();
var $board  = document.getElementById('board');
var pcMove, $squareClicked;
game.init();

var board   = game.getBoard();
var state = game.getCurrentState().slice();     // used by IA algorithm


$board.onclick = function (e) {

    $squareClicked = e.target;

    if ( game.isPlaying() && game.getTurn() === 'human') {

        if (board.drawToken($squareClicked, 'O')) {
            game.commitMove($squareClicked.className.slice(2), 'O');
            state  = game.getCurrentState().slice();
            pcMove = getBestMove();
            board.drawToken(pcMove, 'X');
            game.commitMove(pcMove, 'X');
        }
    }

};



