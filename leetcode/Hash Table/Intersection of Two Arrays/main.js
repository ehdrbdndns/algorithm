/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
  const set = new Set(nums1);

  const result = new Set();
  nums2.forEach((value) => {
    if (set.has(value)) {
      result.add(value);
    }
  });

  return [...result];
};