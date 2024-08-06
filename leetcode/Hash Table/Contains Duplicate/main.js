/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
  const set = new Set();

  let isExist = false;
  nums.forEach((value) => {
    if (set.has(value)) {
      isExist = true;
      return;
    }

    set.add(value);
  });

  return isExist;
};