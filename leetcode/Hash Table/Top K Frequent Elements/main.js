/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i])) {
      map.set(nums[i], map.get(nums[i]) + 1);
    } else {
      map.set(nums[i], 1)
    }
  }

  const convertedMap = new Map();
  const rankList = [];
  for (let [key, value] of map) {
    convertedMap.set(value, key);
    rankList.push(value);
  }

  rankList.sort((a, b) => b - a);

  const result = [];
  for (let i = 0; i < k; i++) {
    result.push(convertedMap.get(rankList[i]))
  }

  return result;
};