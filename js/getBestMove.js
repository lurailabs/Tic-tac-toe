/**
 * Created by lurai on 6/3/16
 *
 * Uses minimax algorithm to get the best move.
 * In 3X3 board, it checks the whole tree.
 * In larger boards there's a depth limit to make move faster.
 *
 * @retuns  integer - square number of best move
 */


var getBestMove = function() {

    var bestMove = function() {
        var possibleMoves = game.getPossibleMoves(state);

        // add a little randomness to list of possible moves order
        possibleMoves = possibleMoves.sort(function () {
            return .5 - Math.random();
        });

        var best = -10000;
        var aux;
        var position = possibleMoves[0];

        for (var i = 0; i < possibleMoves.length; i++) {
            state[possibleMoves[i]] = game.getToken('pc');
            aux = min(0);

            if (aux > best) {
                best = aux;
                position = possibleMoves[i];
            }
            if (best >= 1) return position;

            state[possibleMoves[i]] = null;
        }
        return position;

    }; // bestMove()


    function max(depth) {

        var terminalState = game.checkTerminal(state);

        if (terminalState === game.getToken('human')) return -1;
        if (terminalState === game.getToken('pc') || terminalState === 'tie') return 0;

        var possibleMoves = game.getPossibleMoves(state);
        var best = -10000;
        var aux;

        for (var k = 0; k < possibleMoves.length; k++) {
            state[possibleMoves[k]] = game.getToken('pc');
            aux = min(depth);
            if (aux > best) best = aux;

            state[possibleMoves[k]] = null;
        }
        return best;

    } // max()

    function min(depth) {

        var terminalState = game.checkTerminal(state);
        if (terminalState === game.getToken('pc')) return 1;
        if (terminalState === game.getToken('human') || terminalState === 'tie') return 0;

        var possibleMoves = game.getPossibleMoves(state);
        var best = 10000;
        var aux;

        depth++;
        // depth in 3x3 is 3, too slow for 4x4
        if (game.getLevel() > 3 && depth > 2) return best;

        for (var j = 0; j < possibleMoves.length; j++) {
            state[possibleMoves[j]] = game.getToken('human');
            aux = max(depth);
            if (aux < best) best = aux;

            state[possibleMoves[j]] = null;
        }
        return best;

    } // min()

    return bestMove();

}; // getBestMove()