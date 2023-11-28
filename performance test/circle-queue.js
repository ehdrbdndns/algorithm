class CQueue {
  constructor(size) {
    this.datas = new Array(size);
    this.front = 0;
    this.rear = -1;
    this.size = size;
  }

  push(value) {
    if (!this.isFull()) {
      this.rear = (this.rear + 1) % this.size;
      this.datas[this.rear] = value;
    }
  }

  pop() {
    if (!this.isEmpty()) {
      let value = this.datas[this.front];

      if (this.front === this.rear) {
        this.front = 0;
        this.rear = -1;
      } else {
        this.front = (this.front + 1) % this.size;
      }

      return value;
    }
  }

  isFull() {
    return !this.isEmpty() && (this.rear + 1) % this.size === this.front;
  }

  isEmpty() {
    return this.rear === -1;
  }

  show() {
    console.log('front: ' + this.front);
    console.log('rear: ' + this.rear);
    console.log('datas: ' + this.datas);
  }
}

function solution() {
  let queue = new CQueue(6);
  queue.push(1);
  queue.push(1);
  queue.push(9);
  queue.push(1);
  queue.push(1);
  console.log(queue.isFull());
  queue.push(1);

  console.log(queue.isFull());

  console.log(queue.pop());
  console.log(queue.pop());
  console.log(queue.pop());
  console.log(queue.pop());
  console.log(queue.pop());
  console.log(queue.isEmpty());
  console.log(queue.pop());
  queue.show();

  console.log(queue.isEmpty());
}

solution();
