var isTrionic = function (nums) {
    const n = nums.length;
    if (nums[0] >= nums[1]) {
        return false;
    }
    let count = 1;
    for (let i = 2; i < n; i++) {
        if (nums[i - 1] === nums[i]) {
            return false;
        }
        if ((nums[i - 2] - nums[i - 1]) * (nums[i - 1] - nums[i]) < 0) {
            count++;
        }
    }
    return count === 3;
};