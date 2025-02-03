class Solution {
    func longestMonotonicSubarray(_ nums: [Int]) -> Int {
        var longestLength = 1;

        var prevNum = nums[0];
        var curSubArrayLength = 1;
        var isContinuous = true;
        var isIncrease = false;

        if nums.count > 1 {
            isIncrease = nums[0] < nums[1];
            isContinuous = nums[0] != nums[1];
        }

        for i in 1..<nums.count  {
            let num = nums[i];

            if prevNum < num {
                // increase 
                if !isContinuous {
                    curSubArrayLength = 2;
                } else if isContinuous && isIncrease {
                    curSubArrayLength += 1;
                } else {
                    curSubArrayLength = 1
                }
            } else if prevNum > num {
                // decrease
                if !isContinuous {
                    curSubArrayLength = 2
                } else if isContinuous && !isIncrease {
                    curSubArrayLength += 1;
                } else {
                    curSubArrayLength = 1;
                }
            } else {
                // same
                curSubArrayLength = 1;
            }

            isContinuous = prevNum != num;
            isIncrease = prevNum < num;
            longestLength = max(longestLength, curSubArrayLength);

            prevNum = num;
        }


        return longestLength;
    }
}