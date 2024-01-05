class PriorityQueue {
  constructor(init, iteratee) {
    this.queue = [init];
    this.iteratee = iteratee;
  }

  push(item) {
    this.queue.push(item);

    if (this.size() === 1) return;

    let curIndex = this.queue.length - 1;
    let rootIndex = Math.floor(curIndex / 2);

    while (this.iteratee(this.queue[curIndex], this.queue[rootIndex])) {
      [this.queue[curIndex], this.queue[rootIndex]] = [
        this.queue[rootIndex],
        this.queue[curIndex],
      ];
      curIndex = rootIndex;
      rootIndex = Math.floor(curIndex / 2);
    }
  }

  pop() {
    if (this.size() < 1) return null;
    if (this.size() === 1) return this.queue.pop();

    let result = this.queue[1];
    this.queue[1] = this.queue.pop();

    if (this.size() === 1) return result;

    let curIndex = 1;
    let leftIndex = 2;
    let rightIndex = 3;
    let childIndex = leftIndex;

    while (1) {
      if (this.queue[leftIndex] === undefined) {
        break;
      }

      if (
        this.queue[rightIndex] !== undefined &&
        this.iteratee(this.queue[rightIndex], this.queue[leftIndex])
      ) {
        childIndex = rightIndex;
      }

      if (this.iteratee(this.queue[childIndex], this.queue[curIndex])) {
        [this.queue[curIndex], this.queue[childIndex]] = [
          this.queue[childIndex],
          this.queue[curIndex],
        ];
        curIndex = childIndex;
        leftIndex = curIndex * 2;
        rightIndex = leftIndex + 1;
        childIndex = leftIndex;
      } else {
        break;
      }
    }

    return result;
  }

  size() {
    return this.queue.length - 1;
  }

  peek() {
    return this.queue[1];
  }
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let count = 0;
let result = [];
const minQueue = new PriorityQueue(Number.MIN_SAFE_INTEGER, (a, b) =>
  a.l === b.l ? a.p < b.p : a.l < b.l
);
const maxQueue = new PriorityQueue(Number.MAX_SAFE_INTEGER, (a, b) =>
  a.l === b.l ? a.p > b.p : a.l > b.l
);
const isDeleted = new Map();
const itemList = new Array();
rl.question('', (answer) => {
  N = Number(answer);

  rl.on('line', solution).on('close', closeListener);
});

function solution(line) {
  if (count < N) {
    const [p, l] = line.split(' ').map((i) => Number(i));
    itemList[p] = l;
    minQueue.push({ p, l });
    maxQueue.push({ p, l });
  } else if (count === N) {
    M = Number(line);
  } else {
    const [com, ...other] = line.split(' ');
    switch (com) {
      case 'add':
        const [p, l] = other.map((i) => Number(i));
        itemList[p] = l;
        minQueue.push({ p, l });
        maxQueue.push({ p, l });
        break;
      case 'recommend':
        if (other[0] === '1') {
          while (maxQueue.size() !== 0) {
            const { p, l } = maxQueue.peek();
            if (!isDeleted.has(p) || isDeleted.get(p) !== l) {
              result.push(p);
              break;
            } else {
              maxQueue.pop();
            }
          }
        } else {
          while (minQueue.size() !== 0) {
            const { p, l } = minQueue.peek();
            if (!isDeleted.has(p) || isDeleted.get(p) !== l) {
              result.push(p);
              break;
            } else {
              minQueue.pop();
            }
          }
        }
        break;
      case 'solved':
        isDeleted.set(Number(other[0]), itemList[other[0]]);
        break;
      default:
        break;
    }
  }

  count++;
}

function closeListener() {
  console.log(result.join('\n'));
  process.exit();
}
