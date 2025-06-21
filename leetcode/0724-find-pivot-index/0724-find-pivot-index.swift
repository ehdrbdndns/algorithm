class Solution {
    func pivotIndex(_ nums: [Int]) -> Int {
        if(nums.count == 1) {
            return 0
        }

        let sumOfNums = nums.reduce(0, { (a, b) in 
            a + b
        })

        var rightSum = sumOfNums
        var leftSum = 0
        var result = -1

        for (i, e) in nums.enumerated() {
            if(i != 0) {
                leftSum = leftSum + nums[i - 1]
            }
            
            rightSum = rightSum - e

            if(leftSum == rightSum) {
                result = i
                break;
            }
        }

        return result
    }
}