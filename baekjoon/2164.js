class DeleteQueue {
  constructor() {
    this.data = [];
    this.front = 0;
    this.rear = 0;
  }

  push(v) {
    this.data[this.front++] = v;
  }

  pop() {
    let value = this.data[this.rear];
    delete this.data[this.rear++];
    return value;
  }

  size() {
    return this.front - this.rear;
  }

  back() {
    return this.data[this.rear];
  }
}

function solution(n) {
  let queue = new DeleteQueue();
  for (let i = 0; i < n; i++) {
    queue.push(i + 1);
  }
  while (queue.size() > 1) {
    queue.pop();
    queue.push(queue.pop());
  }
  console.log(queue.back());
}

const fs = require('fs');
const n = fs.readFileSync('/dev/stdin').toString().trim();

solution(Number(n));
// solution(4);
