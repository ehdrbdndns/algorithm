
var RandomizedSet = function () {
  this.map = new Map();
  this.arr = [];
};

/** 
* @param {number} val
* @return {boolean}
*/
RandomizedSet.prototype.insert = function (val) {
  let result = !this.map.has(val);
  if (result) {
    this.map.set(val, this.arr.length)
    this.arr.push(val);
  }

  return result;
};

/** 
* @param {number} val
* @return {boolean}
*/
RandomizedSet.prototype.remove = function (val) {
  let result = this.map.has(val);

  if (result) {
    let index = this.map.get(val);

    const lastValue = this.arr[this.arr.length - 1];
    this.arr[index] = lastValue;
    this.map.set(lastValue, index);

    this.arr.pop();
    this.map.delete(val);
  }

  return result;
};

/**
* @return {number}
*/
RandomizedSet.prototype.getRandom = function () {
  const randomIndex = Math.floor(Math.random() * (this.arr.length));

  return this.arr[randomIndex]
};

/** 
* Your RandomizedSet object will be instantiated and called as such:
* var obj = new RandomizedSet()
* var param_1 = obj.insert(val)
* var param_2 = obj.remove(val)
* var param_3 = obj.getRandom()
*/