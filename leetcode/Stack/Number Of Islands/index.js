const bfs = (cur, target, edge, grid) => {
  const dir = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const { m, n } = cur;
  const { left, right, top, bottom } = edge;

  for (let i = 0; i < dir.length; i++) {
    // get new position
    const newM = m + dir[i][0];
    const newN = n + dir[i][1];

    // check edge
    if (newN < left || newN > right ||
      newM < top || newM > bottom) {
      continue;
    }

    // check WATER
    if (grid[newM][newN] !== target) {
      continue;
    }

    // goto bfs
    //   change land
    grid[newM][newN] = "0";
    bfs({ m: newM, n: newN }, target, edge, grid);
  }
}

/**
* @param {character[][]} grid
* @return {number}
*/
var numIslands = function (grid) {
  const M = grid.length;
  const N = grid[0].length;

  const LAND = "1";
  const WATER = "0";

  let numberOfIslands = 0;
  for (let m = 0; m < M; m++) {
    for (let n = 0; n < N; n++) {
      if (grid[m][n] === LAND) {
        numberOfIslands++;
        grid[m][n] = WATER;

        // bfs for search LAND
        bfs({ m, n }, LAND, { left: 0, top: 0, bottom: M - 1, right: N - 1 }, grid);
      }
    }
  }

  // return number of islands
  return numberOfIslands;
};