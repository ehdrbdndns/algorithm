
var MyHashSet = function () {
  this.set = {};
};

/** 
* @param {number} key
* @return {void}
*/
MyHashSet.prototype.add = function (key) {
  if (!this.set[key]) {
    this.set[key] = key;
  }
};

/** 
* @param {number} key
* @return {void}
*/
MyHashSet.prototype.remove = function (key) {
  if (this.set[key]) {
    delete this.set[key]
  }
};

/** 
* @param {number} key
* @return {boolean}
*/
MyHashSet.prototype.contains = function (key) {
  return this.set[key] === key
};

/** 
* Your MyHashSet object will be instantiated and called as such:
* var obj = new MyHashSet()
* obj.add(key)
* obj.remove(key)
* var param_3 = obj.contains(key)
*/