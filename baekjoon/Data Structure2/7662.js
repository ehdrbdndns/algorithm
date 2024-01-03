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
      // console.log(1);
      if (
        this.queue[rightIndex] !== undefined &&
        this.iteratee(this.queue[rightIndex], this.queue[leftIndex])
      ) {
        childIndex = rightIndex;
      }

      // console.log(2);
      // console.log(this.iteratee);
      // console.log(this.queue[childIndex]);
      // console.log(this.queue[curIndex]);
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
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let t;
let count = 0;
let length = 0;
let isStart = false;
let minQueue = new PriorityQueue(
  Number.MIN_SAFE_INTEGER,
  (a, b) => a.num < b.num
);
let maxQueue = new PriorityQueue(
  Number.MAX_SAFE_INTEGER,
  (a, b) => a.num > b.num
);
let isDeleted = new Map();
rl.question('', (answer) => {
  t = Number(answer);

  rl.on('line', solution).on('close', closeListener);
});

function solution(line) {
  if (isStart) {
    const [CHAR, NUM] = line.split(' ');

    if (CHAR === 'I') {
      let num = Number(NUM);
      minQueue.push({ num: num, id: count });
      maxQueue.push({ num: num, id: count });
    } else if (CHAR === 'D') {
      if (NUM === '-1') {
        while (1) {
          let item = minQueue.pop();
          if (item === null) break;

          let { num, id } = item;
          if (!isDeleted.has(id)) {
            isDeleted.set(id, num);
            // console.log(`min ${id}: ${num}`);
            break;
          }
        }
      } else {
        while (1) {
          let item = maxQueue.pop();
          if (item === null) break;

          let { num, id } = item;
          if (!isDeleted.has(id)) {
            isDeleted.set(id, num);
            // console.log(`max ${id}: ${num}`);
            break;
          }
        }
      }
    }

    count++;

    if (count === length) {
      let maxData;
      let minData;
      // console.log(maxQueue.queue);
      // console.log(minQueue.queue);
      // isDeleted.forEach((v, k) => console.log(`${k}: ${v}`));
      while (maxQueue.size()) {
        let { num, id } = maxQueue.pop();
        // console.log(num, id);
        if (!isDeleted.has(id)) {
          maxData = num;
          break;
        }
      }
      while (minQueue.size()) {
        let { num, id } = minQueue.pop();
        // console.log(num, id);
        if (!isDeleted.has(id)) {
          minData = num;
          break;
        }
      }
      // console.log(`max: ${maxData}, min: ${minData}`);
      if (maxData === undefined && minData === undefined) {
        console.log('EMPTY');
      } else {
        console.log(`${maxData} ${minData}`);
      }

      isStart = false;
    }
  } else {
    // 초기화
    isStart = true;
    count = 0;
    length = Number(line);
    minQueue = new PriorityQueue(
      Number.MIN_SAFE_INTEGER,
      (a, b) => a.num < b.num
    );
    maxQueue = new PriorityQueue(
      Number.MAX_SAFE_INTEGER,
      (a, b) => a.num > b.num
    );
    isDeleted = new Map();
  }
}

function closeListener() {
  process.exit();
}
