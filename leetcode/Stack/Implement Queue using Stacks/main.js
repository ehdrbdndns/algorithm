
var MyQueue = function () {
  this.main = [];
  this.sub = [];
};

/** 
* @param {number} x
* @return {void}
*/
MyQueue.prototype.push = function (x) {
  this.main.push(x);
};

/**
* @return {number}
*/
MyQueue.prototype.pop = function () {
  if (this.empty()) {
    return 0;
  }

  let indexForPop = 0;
  if (this.sub.length) {
    indexForPop = this.sub[this.sub.length - 1] + 1;
  }

  const result = this.main[indexForPop];
  this.sub.push(indexForPop);

  return result;
};

/**
* @return {number}
*/
MyQueue.prototype.peek = function () {
  if (this.empty()) {
    return 0;
  }

  let indexForPop = 0;
  if (this.sub.length) {
    indexForPop = this.sub[this.sub.length - 1] + 1;
  }

  const result = this.main[indexForPop];

  return result;
};

/**
* @return {boolean}
*/
MyQueue.prototype.empty = function () {
  return this.main.length === this.sub.length;
};

/** 
* Your MyQueue object will be instantiated and called as such:
* var obj = new MyQueue()
* obj.push(x)
* var param_2 = obj.pop()
* var param_3 = obj.peek()
* var param_4 = obj.empty()
*/