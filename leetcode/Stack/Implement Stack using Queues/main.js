class CircleQueue {

  constructor() {
    this.queue = [];
    this.count = 0;
    this.head = 0;
  }

  push(x) {
    this.queue[this.head + this.count] = x;
    this.count++;
  }

  pop() {
    if (!this.size()) {
      return null;
    }

    this.head++;
    this.count--;

    if (!this.size()) {
      this.head = 0;
    }
  }

  peek() {
    if (!this.size()) {
      return null;
    }

    return this.queue[this.head]
  }

  size() {
    return this.count;
  }
}

var MyStack = function () {
  this.main = new CircleQueue();
};

/** 
* @param {number} x
* @return {void}
*/
MyStack.prototype.push = function (x) {
  const sub = new CircleQueue();
  const size = this.main.size();

  sub.push(x);
  for (let i = 0; i < size; i++) {
    const value = this.main.peek();
    this.main.pop();
    sub.push(value);
  }


  this.main = sub;
};

/**
* @return {number}
*/
MyStack.prototype.pop = function () {
  const value = this.main.peek();
  this.main.pop();
  return value;
};

/**
* @return {number}
*/
MyStack.prototype.top = function () {
  return this.main.peek();
};

/**
* @return {boolean}
*/
MyStack.prototype.empty = function () {
  return this.main.size() === 0
};

/** 
* Your MyStack object will be instantiated and called as such:
* var obj = new MyStack()
* obj.push(x)
* var param_2 = obj.pop()
* var param_3 = obj.top()
* var param_4 = obj.empty()
*/