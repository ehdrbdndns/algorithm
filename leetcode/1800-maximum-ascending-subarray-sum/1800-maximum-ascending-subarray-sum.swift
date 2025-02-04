class Solution {
    func maxAscendingSum(_ nums: [Int]) -> Int {
        var largestSum = nums[0];
        var curSum = nums[0];

        for i in 1..<nums.count {
            if(nums[i - 1] < nums[i]) {
                // contiguous
                curSum += nums[i];
            } else {
                // reset
                curSum = nums[i];
            }

            largestSum = max(curSum, largestSum);
        }

        return largestSum;
    }
}