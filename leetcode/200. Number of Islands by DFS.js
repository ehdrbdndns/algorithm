/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  let stack = [];
  let result = 0;
  let M = grid.length;
  let N = grid[0].length;
  for (let row = 0; row < M; row++) {
    for (let col = 0; col < N; col++) {
      if (grid[row][col] === '1') {
        // console.log(grid);
        let curRow = row;
        let curCol = col;
        stack.push({ curRow, curCol });
        grid[curRow][curCol] = '0';
        while (1) {
          if (curRow + 1 < M && grid[curRow + 1][curCol] === '1') {
            curRow++;
            stack.push({ curRow, curCol });
            grid[curRow][curCol] = '0';
          } else if (curCol + 1 < N && grid[curRow][curCol + 1] === '1') {
            curCol++;
            stack.push({ curRow, curCol });
            grid[curRow][curCol] = '0';
          } else if (curRow - 1 >= 0 && grid[curRow - 1][curCol] === '1') {
            curRow--;
            stack.push({ curRow, curCol });
            grid[curRow][curCol] = '0';
          } else if (curCol - 1 >= 0 && grid[curRow][curCol - 1] === '1') {
            curCol--;
            stack.push({ curRow, curCol });
            grid[curRow][curCol] = '0';
          } else if (stack.length) {
            const prev = stack.pop();
            if (prev.curRow !== curRow || prev.curCol !== curCol) {
              stack.push(prev);
            }
            curRow = prev.curRow;
            curCol = prev.curCol;
          } else {
            break;
          }
        }
        result++;
      }
    }
  }
  return result;
};
