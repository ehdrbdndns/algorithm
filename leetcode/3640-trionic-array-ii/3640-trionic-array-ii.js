/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSumTrionic = function (nums) {
    const n = nums.length;
    let ans = -Infinity;

    for (let i = 0; i < n; i++) {
        let j = i + 1;
        let res = 0;

        // first segment: increasing segment
        while (j < n && nums[j - 1] < nums[j]) {
            j++;
        }
        const p = j - 1;

        if (p === i) {
            continue;
        }

        // second segment: decreasing segment
        res += nums[p] + nums[p - 1];
        while (j < n && nums[j - 1] > nums[j]) {
            res += nums[j];
            j++;
        }
        const q = j - 1;

        if (q === p || q === n - 1 || (j < n && nums[j] <= nums[q])) {
            i = q;
            continue;
        }

        // third segment: increasing segment
        res += nums[q + 1];

        // find the maximum sum of the third segment
        let maxSum = 0;
        let sum = 0;
        for (let k = q + 2; k < n && nums[k] > nums[k - 1]; k++) {
            sum += nums[k];
            maxSum = Math.max(maxSum, sum);
        }
        res += maxSum;

        // find the maximum sum of the first segment
        maxSum = 0;
        sum = 0;
        for (let k = p - 2; k >= i; k--) {
            sum += nums[k];
            maxSum = Math.max(maxSum, sum);
        }
        res += maxSum;

        // update answer
        ans = Math.max(ans, res);
        i = q - 1;
    }

    return ans;
};