/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
  const rowMap = new Map();
  const colMap = new Map();
  const gridMap = new Map();
  const test = new Set();

  for (let row = 0; row < board.length; row++) {
    if (!rowMap.has(row)) {
      rowMap.set(row, new Set());
    }

    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === '.') {
        continue;
      }

      if (!colMap.has(col)) {
        colMap.set(col, new Set());
      }

      const rowIndex = Math.floor(row / 3) * 3 + 1;
      const colIndex = Math.floor(col / 3);
      const gridLocation = rowIndex + colIndex;

      if (!gridMap.has(gridLocation)) {
        gridMap.set(gridLocation, new Set());
      }

      const value = board[row][col];
      if (rowMap.get(row).has(value)) {
        return false;
      }

      if (colMap.get(col).has(value)) {
        return false;
      }

      if (gridMap.get(gridLocation).has(value)) {
        return false;
      }

      rowMap.get(row).add(value)
      colMap.get(col).add(value)
      gridMap.get(gridLocation).add(value)
    }
  }

  return true;
};