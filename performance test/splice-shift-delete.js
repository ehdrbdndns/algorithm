class SpliceQueue {
  constructor(size) {
    this.data = new Array(size);
  }

  push(v) {
    this.data.push(v);
  }

  pop() {
    let value = this.data.splice(0, 1);
    return value;
  }

  size() {
    return this.data.length;
  }
}

class ShiftQueue {
  constructor(size) {
    this.data = new Array(size);
  }

  push(v) {
    this.data.push(v);
  }

  pop() {
    return this.data.shift();
  }

  size() {
    return this.data.length;
  }
}

class DeleteQueue {
  constructor(size) {
    this.data = new Array(size);
    this.front = size;
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
}

function test() {
  let n = 90000;
  let DeleteArry = new DeleteQueue(n);
  let ShiftArray = new ShiftQueue(n);
  let SpliceArray = new SpliceQueue(n);
  // slice(0, 1)
  let start = Date.now();
  while (DeleteArry.size() > 0) {
    DeleteArry.pop();
  }
  let end = Date.now();
  console.log('Delete: ', end - start);

  // shift()
  start = Date.now();
  while (ShiftArray.size() > 0) {
    ShiftArray.pop();
  }
  end = Date.now();
  console.log('shift: ', end - start);

  // shift()
  start = Date.now();
  while (SpliceArray.size() > 0) {
    SpliceArray.pop();
  }
  end = Date.now();
  console.log('Splice: ', end - start);
}

test();
