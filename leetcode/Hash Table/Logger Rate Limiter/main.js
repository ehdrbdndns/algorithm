var Logger = function () {
  this.map = new Map();
};

/** 
* @param {number} timestamp 
* @param {string} message
* @return {boolean}
*/
Logger.prototype.shouldPrintMessage = function (timestamp, message) {
  if (this.map.has(message)) {
    if (this.map.get(message) <= timestamp) {
      this.map.set(message, timestamp + 10)
      return true;
    } else {
      return false;
    }
  } else {
    this.map.set(message, timestamp + 10);
    return true;
  }
};

/** 
* Your Logger object will be instantiated and called as such:
* var obj = new Logger()
* var param_1 = obj.shouldPrintMessage(timestamp,message)
*/