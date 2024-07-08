/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
var floodFill = function (image, sr, sc, color) {
  const m = image.length;
  const n = image[0].length;

  const startColor = image[sr][sc];
  const dirList = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  const visit = Array.from({ length: m }, () => new Array(n).fill(false))
  visit[sr][sc] = true;

  const stack = [];
  stack.push({ row: sr, col: sc });

  while (stack.length) {
    const cur = stack.pop();
    image[cur.row][cur.col] = color;

    for (let i = 0; i < dirList.length; i++) {
      const [row, col] = dirList[i];

      const nextRow = cur.row + row;
      const nextCol = cur.col + col;

      // check edge
      if (nextRow >= m || nextRow < 0 ||
        nextCol >= n || nextCol < 0) {
        continue;
      }

      // check visit
      if (visit[nextRow][nextCol]) {
        continue;
      }

      // check same color
      if (image[nextRow][nextCol] !== startColor) {
        continue;
      }

      // visit
      visit[nextRow][nextCol] = true;
      stack.push({ row: nextRow, col: nextCol });
    }
  }

  return image
};