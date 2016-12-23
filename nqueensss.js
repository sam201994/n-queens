window.findNQueensSolution = function(n) {
  // if(n===3 || n===2)
  //   return [[0]];
  var board = new Board({n: n});
  var obj = {};
  var skip = true;
  var sum = 0;
  var flag = 0;
  var solutionBoardUser = [];
  if (n > 2) {
    skip = false;
  }
  function inner(board, row) {
    if (row === n) {

      if ((sum === n && flag === 0 ) || n === 2 || n === 3) {
        for (var i = 0; i < n; i++) {
          var r = [];
          for (var j = 0; j < n; j++) {
            r[j] = board.rows()[i][j];
          }
          solutionBoardUser.push(r);
        }
        console.log(JSON.stringify(solutionBoardUser));
        flag = 1;
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
        }

        else {
          board.togglePiece(row, col);
          obj[col] = false;
        }
      } 
    }
  }

  inner(board, 0);

 // var solution = solutionBoardUser.rows();


  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solutionBoardUser));
  return solutionBoardUser;
};