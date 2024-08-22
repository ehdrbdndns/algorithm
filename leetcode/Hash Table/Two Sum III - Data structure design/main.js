
var TwoSum = function () {
  // init property
  this.map = new Map();
};

/** 
* @param {number} number
* @return {void}
*/
TwoSum.prototype.add = function (number) {
  if (this.map.has(number)) {
    const count = this.map.get(number);
    this.map.set(number, count + 1);
  } else {
    this.map.set(number, 1);
  }
};

/** 
* @param {number} value
* @return {boolean}
*/
TwoSum.prototype.find = function (value) {
  const keys = this.map.keys();
  for (let key of keys) {
    const leftValue = value - key;

    if (leftValue === key) {
      if (this.map.get(key) > 1) {
        return true;
      }
    } else {
      if (this.map.has(leftValue)) {
        return true;
      }
    }
  }

  return false;
};

/** 
* Your TwoSum object will be instantiated and called as such:
* var obj = new TwoSum()
* obj.add(number)
* var param_2 = obj.find(value)
*/