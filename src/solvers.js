/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  var arrayLength = n;

  function inner(rooksRemaining, board, row) {
    if (rooksRemaining === 0) {
      return;
    }

    for (var i = row; i < arrayLength; i++) {
      for (var j = 0; j < arrayLength; j++) {

        board.togglePiece(i, j);
        if (!board.hasAnyRooksConflicts()) {
          return inner(rooksRemaining--, board, i + 1);
        } else {
          board.togglePiece(i, j);
        }
      }
    }
  }
  inner(n, board, 0);

  var solution = board.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// };

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n: n});
  var arrayLength = n;

  function inner(rooksRemaining, board, row, col) {
    if (row > arrayLength) {
      return;
    } else {
      if (rooksRemaining === 0) {
        solutionCount++;
        return;
      }

      for (var i = row; i < arrayLength; i++) {
        for (var j = 0; j < arrayLength; j++) {

          board.togglePiece(i, j);
          if (!board.hasAnyRooksConflicts()) {
            return inner(rooksRemaining--, board, i + 1);
          } else {
            board.togglePiece(i, j);
          }
        }
      }
    }
  }
  inner(n, board, 0, 0);

  var solution = board.rows();


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
