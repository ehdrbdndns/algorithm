/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
  const mapOfNums = new Map();

  for (let i = 0; i < nums.length; i++) {
    if (mapOfNums.has(nums[i])) {
      mapOfNums.get(nums[i]).push(i);
    } else {
      mapOfNums.set(nums[i], [i]);
    }
  }

  let result = false;
  for (let [_, value] of mapOfNums.entries()) {

    if (value.length < 2) {
      continue;
    }

    for (let i = value.length - 1; i >= 0; i--) {
      for (let j = value.length - 1; j >= 0; j--) {
        if (i === j) {
          continue;
        }

        if (Math.abs(value[i] - value[j]) <= k) {
          result = true;
          return result;
        }
      }
    }
  }

  return result;
};