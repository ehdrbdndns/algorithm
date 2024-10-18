let maxBit = 0
let map = [];

/**
 * @param {number[]} nums
 * @return {number}
 */
var countMaxOrSubsets = function(nums) {
    // 1. find maximum 
    maxBit = nums.reduce((a, b) => a | b, 0);
    map = new Array(nums.length).fill(false);

    const result = findSubset(nums, nums[0], 0);

    return result;
};

function findSubset(nums, acc, curIndex) {
    let count = 0;

    // base case
    if(curIndex === nums.length - 1) {
        return acc === maxBit ? 1 : 0;
    }

    if(acc === maxBit) {
        count = 1;
    }

    for(let i = curIndex + 1; i < nums.length; i++) {
        count += findSubset(nums, acc | nums[i], i);

        if(map[curIndex] === false) {
            count += findSubset(nums, nums[i], i);
            map[curIndex] = true;
        } 
    }

    return count;
}
