/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumCost = function(nums) {
    let sortedNums = nums.slice(1, nums.length).sort((a, b) => a - b)

    return nums[0] + sortedNums[0] + sortedNums[1]
};