class LQueue {
  constructor() {
    this.datas = [];
    this.top = 0;
    this.rear = 0;
  }

  push(data) {
    this.datas[this.rear++] = data;
  }

  pop() {
    if (this.empty()) return -1;
    let value = this.datas[this.top];
    delete this.datas[this.top++];
    return value;
  }

  size() {
    return this.rear - this.top;
  }

  empty() {
    return this.size() ? 0 : 1;
  }

  front() {
    if (this.empty()) return -1;
    return this.datas[this.top];
  }

  back() {
    if (this.empty()) return -1;
    return this.datas[this.datas.length - 1];
  }
}

function solution(n, list) {
  const queue = new LQueue();

  let result = [];
  list.forEach((element) => {
    switch (element[0]) {
      case 'push':
        queue.push(element[1]);
        break;
      case 'pop':
        result.push(queue.pop());
        break;
      case 'size':
        result.push(queue.size());
        break;
      case 'empty':
        result.push(queue.empty());
        break;
      case 'front':
        result.push(queue.front());
        break;
      case 'back':
        result.push(queue.back());
        break;
      default:
        break;
    }
  });
  console.log(result.join('\n'));
}

// const testData = `15
// push 1
// push 2
// front
// back
// size
// empty
// pop
// pop
// pop
// size
// empty
// pop
// push 3
// empty
// front`;
// const [n, ...list] = testData.split('\n');

const fs = require('fs');
const [n, ...list] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

solution(
  Number(n),
  list.map((item) => item.split(' '))
);
