/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const hashMap = new Map();

  // insert hash map
  nums.forEach((value, index) => {
    hashMap.set(value, index);
  });

  let result;
  for (let i = 0; i < nums.length; i++) {
    const newKey = target - nums[i];
    if (hashMap.has(newKey)) {
      if (hashMap.get(newKey) === i) {
        continue;
      }
      result = [i, hashMap.get(newKey)];
      break;
    }
  }

  return result;
};