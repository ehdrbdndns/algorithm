/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const map = new Map();

  for (let num of nums) {
    if (map.has(num)) {
      map.set(num, map.get(num) + 1);
    } else {
      map.set(num, 1)
    }
  }

  const convertedMap = new Map();
  const rankList = [];
  for (let [key, value] of map) {
    if (convertedMap.has(value)) {
      convertedMap.get(value).push(key);
    } else {
      convertedMap.set(value, [key]);
      rankList.push(value);
    }
  }

  rankList.sort((a, b) => b - a);

  let _k = k;
  let i = 0;
  let result = [];
  while (_k > 0) {
    const rank = rankList[i];
    const numList = convertedMap.get(rank);
    if (numList.length <= _k) {
      result.push(...numList);
      _k -= numList.length;
    } else {
      for (let j = 0; j < _k; j++) {
        result.push(numList[j]);
      }
      _k = 0;
    }

    i++;
  }

  return result;
};