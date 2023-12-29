class PQeue {
  constructor() {
    this.queue = [Number.MIN_VALUE];
  }

  set insert(value) {
    this.queue.push(value);

    if (this.size() === 0) return;

    let curIndex = this.queue.length - 1;
    let rootIndex = Math.floor(curIndex / 2);
    // get root
    while (this.queue[rootIndex] > this.queue[curIndex]) {
      // [this.queue[rootIndex], this.queue[curIndex]] = [
      //   this.queue[curIndex],
      //   this.queue[rootIndex],
      // ];
      let temp = this.queue[rootIndex];
      this.queue[rootIndex] = this.queue[curIndex];
      this.queue[curIndex] = temp;
      curIndex = rootIndex;
      rootIndex = Math.floor(curIndex / 2);
    }
  }

  get pop() {
    if (this.size() === 0) return;

    const root = this.queue[1];
    const child = this.queue.pop();

    if (this.size() === 0) return root;

    this.queue[1] = child;

    let rootIndex = 1;
    while (1) {
      let leftIndex = rootIndex * 2;
      let rightIndex = rootIndex * 2 + 1;
      let childIndex = leftIndex;

      if (rightIndex > this.size()) {
        childIndex = leftIndex;
      } else {
        childIndex =
          this.queue[leftIndex] < this.queue[rightIndex]
            ? leftIndex
            : rightIndex;
      }

      if (this.queue[rootIndex] > this.queue[childIndex]) {
        // [this.queue[rootIndex], this.queue[childIndex]] = [
        //   this.queue[childIndex],
        //   this.queue[rootIndex],
        // ];
        let temp = this.queue[rootIndex];
        this.queue[rootIndex] = this.queue[childIndex];
        this.queue[childIndex] = temp;

        rootIndex = childIndex;
      } else {
        break;
      }
    }

    return root;
  }

  size() {
    return this.queue.length - 1;
  }

  init() {
    delete this.queue;
    this.queue = new Array();
  }
}

// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

let n;
let result = [];
const PQueue = new PQeue();

rl.question('', (answer) => {
  n = Number(answer);

  rl.on('line', solution).on('close', closeListener);
});

// const [testN, ...list] = `5
// 12 7 9 15 5
// 13 8 11 19 6
// 21 10 26 31 16
// 48 14 28 35 25
// 52 20 32 41 49`.split('\n');
// let n = testN;

function solution(line) {
  if (line === '') {
    rl.close();
  }

  line.split(' ').forEach((num) => {
    PQueue.insert = Number(num);
    if (PQueue.size() > n) {
      PQueue.pop;
    }
  });
}

function closeListener() {
  console.log(PQueue.pop);
  process.exit();
}

// for (let i = 0; i < list.length; i++) {
//   solution(list[i]);
// }
