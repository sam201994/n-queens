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

  function inner(board, row) {
    if (row === n) {
      return;
    }
    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if (!board.hasColConflictAt(col)) {
        return inner(board, row + 1);
      } 
      board.togglePiece(row, col);
    }
  }
  inner(board, 0);

  var solution = board.rows();
 // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// };

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  if (n === 0) { return 0; }
  var board = new Board({n: n});
  var solutionCount = 0;
  var obj = {};

  function inner(board, row) {
    if (row === n) {
      solutionCount++;
      return;
    }
    for (var col = 0; col < n; col++) {
      if (!board.hasColumn(col, obj)) {
        board.togglePiece(row, col);
        inner(board, row + 1);
        obj[col] = false;
      } 
    }
  }

  inner(board, 0);

  var solution = board.rows();


 // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};





// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var obj = {};
  var skip = true;
  var sum = 0;
  var solutionFound = false;
  var solutionBoardUser = [];
  if (n > 2) { skip = false; }
  if (n === 3 || n === 2) { return board.rows(); }

  function inner(board, row) {
    if (solutionFound) {
      return;
    }
    if (row === n) {
      if ((sum === n)) {
        solutionBoardUser = board.matrixCopy(board.rows());
        solutionFound = true;
      }
      return;
    }
    for (var col = 0; col < n; col++) {
      if (!board.hasColumn(col, obj)) {
        board.togglePiece(row, col);
        if (!board.hasAnyDiagonalConflicts()) {
          sum++;
          inner(board, row + 1);
          if (!skip) {
            sum--;
            board.togglePiece(row, col);
            obj[col] = false;
          }
        } else {
          board.togglePiece(row, col);
          obj[col] = false;
        }
      } 
    }
  }
  inner(board, 0);
  // var solution = solutionBoardUser.rows();
  //console.log('Single solution for ' + n + ' queens:', JSON.stringify(solutionBoardUser));
  return solutionBoardUser;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board({n: n});
  var obj = {};
  var skip = true;
  var sum = 0;
  var solutionCount = 0;
  if (n > 2) { skip = false; }
  
  function inner(board, row) {
    if (row === n) {
      if (sum === n) { solutionCount++; }
      return;
    }
    for (var col = 0; col < n; col++) {
      if (!board.hasColumn(col, obj)) {
        board.togglePiece(row, col);
        if (!board.hasAnyDiagonalConflicts()) {
          sum++;
          inner(board, row + 1);
          if (!skip) {
            sum--;
            board.togglePiece(row, col);
            obj[col] = false;
          }
        } else {
          board.togglePiece(row, col);
          obj[col] = false;
        }
      } 
    }
  }
  inner(board, 0);
  //console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
