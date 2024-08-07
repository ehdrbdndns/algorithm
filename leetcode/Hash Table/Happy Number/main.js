const sumOfDigit = (num) => {
  let sum = 0;
  let copiedNum = num;

  while (copiedNum > 9) {
    const digit = copiedNum % 10;
    copiedNum = Math.floor(copiedNum / 10);

    sum += Math.pow(digit, 2);
  }

  sum += Math.pow(copiedNum, 2);

  return sum;
}

/**
* @param {number} n
* @return {boolean}
*/
var isHappy = function (n) {
  // set 으로 무한 재귀 방지
  const visited = new Set();
  let num = n;

  while (!visited.has(num)) {
    visited.add(num);
    num = sumOfDigit(num);

    if (num === 1) {
      return true;
    }
  }

  return false;
};