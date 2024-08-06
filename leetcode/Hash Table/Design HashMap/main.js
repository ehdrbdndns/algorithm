const NUMBER_OF_BUCKET = 1000;

var MyHashMap = function () {
  this.map = [] = new Array(NUMBER_OF_BUCKET).fill(null);
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
MyHashMap.prototype.put = function (key, value) {
  const index = key % NUMBER_OF_BUCKET;

  if (this.map[index] === null) {
    this.map[index] = [];
    this.map[index].push([key, value]);
  } else {
    let isExist = false;
    this.map[index].forEach((item, mapIndex) => {
      const [itemKey, _] = item;

      if (itemKey === key) {
        this.map[index][mapIndex][1] = value;
        isExist = true;
        return;
      }
    })

    if (!isExist) {
      this.map[index].push([key, value]);
    }
  }
};

/** 
 * @param {number} key
 * @return {number}
 */
MyHashMap.prototype.get = function (key) {
  const index = key % NUMBER_OF_BUCKET;

  if (this.map[index] === null) {
    return -1;
  } else {
    let isExist = false;
    let value = undefined;
    this.map[index].forEach((item) => {
      const [itemKey, itemValue] = item;

      if (itemKey === key) {
        value = itemValue;
        isExist = true;
        return;
      }
    });

    if (isExist) {
      return value;
    } else {
      return -1;
    }
  }
};

/** 
 * @param {number} key
 * @return {void}
 */
MyHashMap.prototype.remove = function (key) {
  const index = key % NUMBER_OF_BUCKET;

  if (this.map[index] === null) {
    return;
  }

  const removedList = this.map[index].filter((item) => {
    const [itemKey, _] = item;

    return itemKey !== key;
  });

  this.map[index] = removedList;
};

/** 
 * Your MyHashMap object will be instantiated and called as such:
 * var obj = new MyHashMap()
 * obj.put(key,value)
 * var param_2 = obj.get(key)
 * obj.remove(key)
 */