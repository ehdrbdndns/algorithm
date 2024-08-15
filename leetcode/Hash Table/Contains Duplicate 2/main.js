/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
const MAX_NUM = 100001;
var containsNearbyDuplicate = function (nums, k) {
  let result = MAX_NUM;
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i])) {
      let gap = Math.abs(map.get(nums[i]) - i);
      result = result > gap ? gap : result;
    }

    map.set(nums[i], i);
  }

  return k >= result;
};