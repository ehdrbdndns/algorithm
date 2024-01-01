class LQueue {
  constructor() {
    this.datas = [];
    this.front = 0;
    this.rear = 0;
  }

  push(data) {
    this.datas[this.rear++] = data;
  }

  pop() {
    let value = this.datas[this.front];
    delete this.datas[this.front++];
    return value;
  }

  size() {
    return this.rear - this.front;
  }
}

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  const WATER = '0';
  const LAND = '1';
  const VISITED = '2';
  const DIR = [
    { row: 0, col: 1 },
    { row: 0, col: -1 },
    { row: 1, col: 0 },
    { row: -1, col: 0 },
  ]; // 동서남북
  const M = grid.length;
  const N = grid[0].length;
  const Queue = new LQueue();

  let landCount = 0;
  for (let row = 0; row < M; row++) {
    for (let col = 0; col < N; col++) {
      if (grid[row][col] === LAND) {
        grid[row][col] = VISITED;
        Queue.push({ row, col });

        //BFS
        while (Queue.size()) {
          let cur = Queue.pop();
          for (let i = 0; i < DIR.length; i++) {
            let newRow = cur.row + DIR[i].row;
            let newCol = cur.col + DIR[i].col;
            if (
              isOutofGridORWaterORVisited(
                grid,
                newRow,
                newCol,
                WATER,
                VISITED,
                M,
                N
              )
            )
              continue;
            grid[newRow][newCol] = VISITED;
            Queue.push({ row: newRow, col: newCol });
          }
        }
        landCount += 1;
      }
    }
  }
  return landCount;
};

function isOutofGridORWaterORVisited(
  grid,
  newRow,
  newCol,
  WATER,
  VISITED,
  M,
  N
) {
  return (
    newRow < 0 ||
    newCol < 0 ||
    newRow >= M ||
    newCol >= N ||
    grid[newRow][newCol] === WATER ||
    grid[newRow][newCol] === VISITED
  );
}
