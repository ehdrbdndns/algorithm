let isFind = false;

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  const n = matrix.length;
  const m = matrix[0].length;
  isFind = false;
  console.log(n, m);

  const visitedTable = matrix.map(row => row.map(() => false));

  const startPivot = [Math.floor(m / 2), Math.floor(n / 2)];

  const result = divide_conqure(matrix, startPivot, target, m, n, visitedTable);

  return result;
};

const divide_conqure = (mat, pos, target, m, n, visitedTable) => {
  const [x, y] = pos;

  if (isFind) {
    return true;
  }

  // base case
  if ((x >= m || y >= n) || (x < 0 || y < 0)) {
    return false;
  }

  if (mat[y][x] === target) {
    isFind = true;
    return true;
  }

  if (visitedTable[y][x]) {
    return false;
  }

  // visit
  visitedTable[y][x] = true;

  let sub_prob1 = false;
  let sub_prob2 = false;
  if (mat[y][x] < target) {
    // right 
    sub_prob1 = divide_conqure(mat, [x + 1, y], target, m, n, visitedTable);

    // bottom
    sub_prob2 = divide_conqure(mat, [x, y + 1], target, m, n, visitedTable);
  } else if (mat[y][x] > target) {
    // left
    sub_prob1 = divide_conqure(mat, [x - 1, y], target, m, n, visitedTable);

    // top
    sub_prob2 = divide_conqure(mat, [x, y - 1], target, m, n, visitedTable);
  }

  // combine
  return sub_prob1 || sub_prob2;
}