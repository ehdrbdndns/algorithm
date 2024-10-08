/**
 * @param {number[]} position
 * @return {number}
 */
var minCostToMoveChips = function (position) {
  const map = new Map();
  let maxCount = 1;
  let largestCostNum = position[0];
  for (let i = 0; i < position.length; i++) {
    const coin = position[i];

    if (map.has(coin)) {
      const newNumber = map.get(coin) + 1;
      map.set(coin, newNumber);

      if (maxCount < newNumber) {
        maxCount = newNumber;
        largestCostNum = coin;
      }
    } else {
      map.set(coin, 1);
    }
  }

  let result = 0;
  for (let [key, value] of map) {
    if (key === largestCostNum) {
      continue;
    }

    result += (Math.abs(largestCostNum - key) % 2) * value;
  }

  return result;
};