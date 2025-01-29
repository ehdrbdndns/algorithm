class Solution {
    func findMaxConsecutiveOnes(_ nums: [Int]) -> Int {
        var maxConsecutiveCount = 0;
        var curConsecutiveCount = 0;

        for num in nums {
            if num == 1 {
                curConsecutiveCount += 1;
            } else {
                maxConsecutiveCount = maxConsecutiveCount < curConsecutiveCount ? curConsecutiveCount : maxConsecutiveCount
                curConsecutiveCount = 0;
            }
        }

        maxConsecutiveCount = maxConsecutiveCount < curConsecutiveCount ? curConsecutiveCount : maxConsecutiveCount

        return maxConsecutiveCount
    }
}