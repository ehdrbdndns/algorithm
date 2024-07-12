class CircleQueue {
  constructor() {
    this.queue = [];
    this.head = 0;
    this.count = 0;
  }

  push(x) {
    this.queue[this.head + this.count] = x;
    this.count++;
  }

  pop() {
    if (this.isEmpty()) {
      return;
    }

    const value = this.queue[this.head];
    this.head++;
    this.count--;

    if (this.isEmpty()) {
      this.head = 0;
    }

    return value;
  }

  peek() {
    if (this.isEmpty()) {
      return;
    }
    return this.queue[this.head];
  }

  size() {
    return this.count;
  }

  isEmpty() {
    return this.count === 0;
  }
}

const DIRLIST = [[0, 1], [0, -1], [1, 0], [-1, 0]];

function bfs(sr, sc, m, n, visited, mat) {
  const queue = new CircleQueue();
  queue.push({ row: sr, col: sc, depth: 2 });

  while (queue.size() > 0) {
    const cur = queue.pop();

    for (let dir of DIRLIST) {
      const [row, col] = dir;

      const newRow = cur.row + row;
      const newCol = cur.col + col;

      // check edge
      if (newRow < 0 || newRow >= m
        || newCol < 0 || newCol >= n) {
        continue;
      }

      // check visited
      if (visited[newRow][newCol] !== -1) {
        // if cur depth bigger than visited, continue
        if (visited[newRow][newCol] <= cur.depth) {
          continue;
        }
      }

      // check target
      if (mat[newRow][newCol] === 0) {
        continue;
      }

      // visit
      visited[newRow][newCol] = cur.depth;
      queue.push({ row: newRow, col: newCol, depth: cur.depth + 1 });
    }
  }
}

/**
* @param {number[][]} mat
* @return {number[][]}
*/
var updateMatrix = function (mat) {
  const globalVisited = Array.from({ length: mat.length }, () => new Array(mat[0].length).fill(-1));
  const m = mat.length;
  const n = mat[0].length;

  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[0].length; j++) {
      if (mat[i][j] === 0) {
        globalVisited[i][j] = 0;

        for (let dir of DIRLIST) {
          const [row, col] = dir;

          const newRow = i + row;
          const newCol = j + col;

          // check edge
          if (newRow < 0 || newRow >= m
            || newCol < 0 || newCol >= n) {
            continue;
          }

          // check target
          if (mat[newRow][newCol] === 0) {
            continue;
          }

          // check visit
          if (globalVisited[newRow][newCol] === 1) {
            continue;
          }

          // perform bfs
          globalVisited[newRow][newCol] = 1;
          bfs(newRow, newCol, m, n, globalVisited, mat);
        }
      }
    }
  }

  return globalVisited;
};