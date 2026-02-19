/**
 * @param {number[]} nums
 * @return {number}
 */
var longestBalanced = function(nums) {
    let result = 0;

    for(let i = 0; i < nums.length; i++) {
        const odd = new Set()
        const even = new Set()
        
        for(let j = i; j < nums.length; j++) {
            let isEven = nums[j] % 2 === 0

            if(isEven) {
                even.add(nums[j])
            } else {
                odd.add(nums[j])
            }

            if(even.size === odd.size) {
                result = Math.max(result, j - i + 1)
            }
        }
    }

    return result
};