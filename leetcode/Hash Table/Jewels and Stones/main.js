/**
 * @param {string} jewels
 * @param {string} stones
 * @return {number}
 */
var numJewelsInStones = function (jewels, stones) {
  const set = new Set(jewels.split(''));
  let result = 0;
  for (let stone of stones) {
    if (set.has(stone)) result++;
  }

  return result;
};