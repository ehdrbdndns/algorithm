function constructTransformedArray(nums: number[]): number[] {
    let n = nums.length
    let newNums: number[] = Array.from({length: nums.length}, () => 0)
    
    for(let i = 0; i < nums.length; i++) {
        let target = ((i + nums[i]) % n + n) % n
        newNums[i] = nums[target]
    }

    return newNums
};