/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
  const shorter = nums1.length > nums2.length ? nums2 : nums1;
  const longer = nums1.length > nums2.length ? nums1 : nums2;

  const existCount = new Map();
  for (let c of longer) {
    if (existCount.has(c)) {
      existCount.set(c, existCount.get(c) + 1)
    } else {
      existCount.set(c, 1);
    }
  }

  const result = [];
  for (let c of shorter) {
    if (existCount.has(c)) {
      result.push(c);

      if (existCount.get(c) === 1) {
        existCount.delete(c);
      } else {
        existCount.set(c, existCount.get(c) - 1);
      }
    }
  }

  return result;
};