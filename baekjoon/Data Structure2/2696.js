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
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let t;
let isM = true;
let m;
let curCount;
let result = [];
let list = [];
let queue = new PriorityQueue(Number.MAX_SAFE_INTEGER, (a, b) => a > b);

rl.question('', (answer) => {
  t = Number(answer);

  rl.on('line', solution).on('close', closeListener);
});

function solution(line) {
  if (isM || curCount === m) {
    m = Math.floor(Number(line) / 10) + 1;
    isM = false;
    curCount = 0;
    list = [];
    queue = new PriorityQueue(Number.MAX_SAFE_INTEGER, (a, b) => a > b);
  } else {
    // todo solution
    list = list.concat(...line.split(' ').map((i) => Number(i)));
    curCount++;

    // console.log('line: ' + line);
    // console.log(list);
    if (curCount === m) {
      let resultList = [];
      result.push(Math.floor(list.length / 2) + 1);
      list.forEach((v, i, a) => {
        queue.push(v);

        if (queue.size() % 2 === 1) {
          let half = Math.floor(queue.size() / 2) + 1;
          let itemList = [];
          for (let i = 0; i < half; i++) {
            itemList.push(queue.pop());
          }

          resultList.push(itemList[itemList.length - 1]);

          itemList.forEach((v) => {
            queue.push(v);
          });
        }
      });
      result.push(resultList.join(' '));
    }
  }
}

function closeListener() {
  console.log(result.join('\n'));
  process.exit();
}
