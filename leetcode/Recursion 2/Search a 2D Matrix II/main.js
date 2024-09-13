/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  const m = matrix.length;
  const n = matrix[0].length;

  const stack = [];

  const visitedTable = matrix.map(row => row.map(() => false));

  const startPoint = [Math.floor(m / 2), Math.floor(n / 2)];
  stack.push(startPoint);

  let result = false;

  while (stack.length) {
    const [y, x] = stack.pop();

    if (visitedTable[y][x]) {
      continue;
    }

    visitedTable[y][x] = true;

    let nextY = 0;
    let nextX = 0;
    let nextCase1Y = 0
    let nextCase2Y = 0;
    let nextCase1X = 0;
    let nextCase2X = 0;

    if (target === matrix[y][x]) {
      result = true;
      break;
    } else if (target < matrix[y][x]) {
      // middle
      nextY = Math.floor(y / 2);
      nextX = Math.floor(x / 2);

      // case1 
      nextCase1Y = y;
      nextCase1X = x - 1;

      // top
      nextCase2Y = y - 1;
      nextCase2X = x;
    } else { // target > matrix[y][x]
      // right bottom
      nextY = Math.floor(((m - 1) - y) / 2) + y;
      nextX = Math.floor(((n - 1) - x) / 2) + x;

      // right
      nextCase1Y = y;
      nextCase1X = x + 1;

      // bottom
      nextCase2Y = y + 1;
      nextCase2X = x;
    }

    if (!isOut(nextX, nextY, m, n)) {
      stack.push([nextY, nextX]);
    }

    if (!isOut(nextCase1X, nextCase1Y, m, n)) {
      stack.push([nextCase1Y, nextCase1X])
    }

    if (!isOut(nextCase2X, nextCase2Y, m, n)) {
      stack.push([nextCase2Y, nextCase2X])
    }
  }

  return result;
};

const isOut = (x, y, m, n) => {
  if (x < 0 || y < 0) {
    return true;
  }

  if (x >= n || y >= m) {
    return true;
  }

  return false;
}