/**
 * Created by lurai on 6/3/16.
 */

var game, board, state, pcMove, $squareClicked, $buttons;
var $message    = document.getElementById('message');
var $board      = document.getElementById('board');


function endGame() {

    game.setPlaying(false);
    $message.innerHTML = 'end';

    $board.onclick = function(e) {
        $message.innerHTML = 'Tic-tac-toe';
        startGame();
    };

} // endGame()


function pcTurn() {

    if ( game.isPlaying() && game.getTurn() === 'pc') {
        pcMove = getBestMove();
        board.drawToken(pcMove, game.getToken('pc'));
        game.commitMove(pcMove, game.getToken('pc'));
    }

    if(!game.isPlaying()) endGame();

} // pcTurn()



function startGame() {

    game    = new Game();
    board   = game.getBoard();                      // board on game logic
    state   = game.getCurrentState().slice();       // used by IA to try positions

    if(!game.isPlaying()) {

        /* Sweet Alert Modal: game options */

        var text =  '<div id="X">X</div> <div id="or">or</div> <div id="O" class="active">O</div>' +
            '<h2>Board size</h2>' +
            '<div id="level-3x3" class="active">3x3</div>' +
            '<div id="level-4x4">4x4</div>';

        swal({
                title: 'OPTIONS',
                text: text,
                html: true,
                confirmButtonText: 'START',
                confirmButtonColor: '#542e20',
                allowEscapeKey: false
            },
            function () {
                game.setPlaying(true);
                if (game.getTurn() === 'pc') pcTurn();
            }
        );
    }

    $buttons = {
        X:      document.getElementById('X'),
        O:      document.getElementById('O'),
        level3: document.getElementById('level-3x3'),
        level4: document.getElementById('level-4x4')
    };

    /* EVENTS */

    $buttons.level3.onclick = function(e) {
        game.setLevel(3);
        $buttons.level3.classList.add('active');
        $buttons.level4.classList.remove('active');
        $board.classList.remove('board-4x4');
    };

    $buttons.level4.onclick = function(e) {
        game.setLevel(4);
        $buttons.level4.classList.add('active');
        $buttons.level3.classList.remove('active');
        $board.classList.add('board-4x4');
    };

    $buttons.X.onclick = function(e) {
        game.setHuman('X');
        $buttons.X.classList.add('active');
        $buttons.O.classList.remove('active');
    };

    $buttons.O.onclick = function(e) {
        game.setHuman('O');
        $buttons.O.classList.add('active');
        $buttons.X.classList.remove('active');
    };

    $board.onclick = function (e) {

        $squareClicked = e.target;

        if ( game.isPlaying() && game.getTurn() === 'human') {

            if (board.drawToken($squareClicked, game.getToken('human'))) {
                game.commitMove($squareClicked.className.slice(2), game.getToken('human'));
                state = game.getCurrentState().slice();
            }
        }
        pcTurn();
    };

} // startGame()



startGame();


