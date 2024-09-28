/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function (board) {
  backtrace(board, 0, 0)
};

const backtrace = (board, row, col) => {

  if (!isEmpty(board, row, col)) {
    if (row === 8 && col === 8) {
      return true;
    } else if (row === 8) {
      return backtrace(board, 0, col + 1);
    } else {
      return backtrace(board, row + 1, col);
    }
  }

  let isFilled = false;
  for (let value = 1; value <= 9; value++) {
    value = value + ''
    if (isValid(board, row, col, value)) {
      place(board, row, col, value);

      if (row === 8 && col === 8) {
        // end
        isFilled = true;
        break;
      } else if (row === 8) {
        // next col
        isFilled = backtrace(board, 0, col + 1);
      } else {
        isFilled = backtrace(board, row + 1, col);
      }

      if (isFilled) {
        break;
      }

      remove(board, row, col);
    }
  }

  return isFilled;
}

const isEmpty = (board, row, col) => {
  // check is empty
  return board[row][col] === '.'
}

const isValid = (board, row, col, value) => {
  // check row
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === value) {
      return false;
    }
  }

  // check col
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === value) {
      return false;
    }
  }

  // check 3 x 3 board
  const rowOfThree = Math.floor(row / 3) * 3;
  const colOfThree = Math.floor(col / 3) * 3;
  // console.log(rowOfThree, colOfThree);

  for (let i = rowOfThree; i < rowOfThree + 3; i++) {
    for (let j = colOfThree; j < colOfThree + 3; j++) {
      if (board[i][j] === value) {
        return false;
      }
    }
  }

  return true;
}

const place = (board, row, col, value) => {
  board[row][col] = value;
}

const remove = (board, row, col) => {
  board[row][col] = '.'
}