function minRemoval(nums: number[], k: number): number {

    if(nums.length === 1) { return 0 }

    nums.sort((a, b) => a - b)

    let n = nums.length
    let ans = n

    // left mini, right max
    let right = 0
    for(let left = 0; left < nums.length; left++) {
        while(right < n && nums[left] * k >= nums[right]) {
            right++
        }

        ans = Math.min(ans, n - (right - left))
    }   

    return ans
};