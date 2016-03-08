/**
 * Created by lurai on 6/3/16.
 */
function getBestMove() {

    var possibleMoves = game.getPossibleMoves(state);
    var best = -10000;
    var aux;
    var position = possibleMoves[0];


    for (var i = 0; i < possibleMoves.length; i++) {
        state[possibleMoves[i]] = game.player.pc;
        aux = min();
        if (aux > best) {
            best = aux;
            position = possibleMoves[i];
        }
        state[possibleMoves[i]] = null;
    }
    return position;

} // getBestMove()

/******************************************************************************/

function max() {

    var terminalState = game.checkTerminal(state);

    if (terminalState === game.player.human) return -1;
    if (terminalState === game.player.pc || terminalState === 'tie') return 0;

    var possibleMoves = game.getPossibleMoves(state);
    var best = -10000;
    var aux;

    for (var k = 0; k < possibleMoves.length; k++) {
        state[possibleMoves[k]] = game.player.pc;
        aux = min();
        if (aux > best) best = aux;

        state[possibleMoves[k]] = null;
    }
    return best;

} // max()

/******************************************************************************/

function min() {
    var terminalState = game.checkTerminal(state);
    if (terminalState === game.player.pc) return 1;
    if (terminalState === game.player.human || terminalState === 'tie') return 0;

    var possibleMoves = game.getPossibleMoves(state);
    var best = 10000;
    var aux;

    for (var j = 0; j < possibleMoves.length; j++) {
        state[possibleMoves[j]] = game.player.human;
        aux = max();
        if (aux < best) best = aux;

        state[possibleMoves[j]] = null;
    }
    return best;

} // min()