class CircleQueue {
  constructor(size) {
    this.queue = new Array(size);
    this.size = this.queue.length;
    this.head = 0;
    this.count = 0;
  }

  enQueue(value) {
    // check is full
    if (this.size === this.count) {
      return;
    }

    this.queue[(this.head + this.count) % this.size] = value;
    this.count++;
  }

  deQueue() {
    // check is EMPTY
    if (this.count === 0) {
      return [];
    }

    this.head = (this.head + 1) % this.size;
    this.count--;
  }

  getHead() {
    return this.queue[this.head];
  }

  getTail() {
    return this.queue[this.tail];
  }

  getSize() {
    return this.count;
  }
}

/**
* @param {number[][]} rooms
* @return {void} Do not return anything, modify rooms in-place instead.
*/
var wallsAndGates = function (rooms) {
  const EMPTY = 2147483647;
  const WALL = -1;
  const GATE = 0;

  const m = rooms.length;
  const n = rooms[0].length;
  const size = m * n;
  const queue = new CircleQueue(size);
  const dir = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  // find all of GATE
  for (let i = 0; i < n; i++) { // n is width, i is width
    for (let j = 0; j < m; j++) { // m is height, j is height
      if (rooms[j][i] === GATE) {
        queue.enQueue({ i, j });
      }
    }
  }

  // BFS for fill distance to its nearest GATE
  while (queue.getSize()) {
    // pop
    const node = queue.getHead();
    queue.deQueue();

    // search
    for (let k = 0; k < dir.length; k++) {
      const [dir1, dir2] = dir[k];
      const { i, j } = node;

      const newWidth = i + dir1;
      const newHeight = j + dir2;

      // check EDGE
      if (newWidth < 0 || newWidth >= n ||
        newHeight < 0 || newHeight >= m) {
        continue;
      }

      // check WALL
      if (rooms[newHeight][newWidth] === WALL) {
        continue;
      }

      // check distance
      if (rooms[newHeight][newWidth] > rooms[j][i] + 1) {
        rooms[newHeight][newWidth] = rooms[j][i] + 1;
        queue.enQueue({ i: newWidth, j: newHeight });
      }
    }
  }
};