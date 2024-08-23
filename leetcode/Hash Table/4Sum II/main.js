/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @param {number[]} nums4
 * @return {number}
 */
var fourSumCount = function (nums1, nums2, nums3, nums4) {
  // sum of nums1 ~ nums2
  const sumOfOneAndTwoMap = new Map();
  for (let i = 0; i < nums1.length; i++) {
    for (let j = 0; j < nums2.length; j++) {
      const val = nums1[i] + nums2[j];
      if (sumOfOneAndTwoMap.has(val)) {
        sumOfOneAndTwoMap.set(val, sumOfOneAndTwoMap.get(val) + 1)
      } else {
        sumOfOneAndTwoMap.set(val, 1);
      }
    }
  }

  let result = 0;
  for (let i = 0; i < nums3.length; i++) {
    for (let j = 0; j < nums4.length; j++) {
      const key = (nums3[i] + nums4[j]) * -1;

      if (sumOfOneAndTwoMap.has(key)) {
        result += sumOfOneAndTwoMap.get(key);
      }
    }
  }

  return result;
};