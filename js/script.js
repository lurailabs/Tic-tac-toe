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

    if ( game.isPlaying() && game.turn === 'human') {

        if (board.drawToken($squareClicked, game.player.human)) {
            game.commitMove($squareClicked.className.slice(2), game.player.human);
            state  = game.getCurrentState().slice();
            pcMove = getBestMove();
            board.drawToken(pcMove, game.player.pc);
            game.commitMove(pcMove, game.player.pc);
        }
    }

};



