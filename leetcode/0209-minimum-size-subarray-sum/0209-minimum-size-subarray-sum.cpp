class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        bool isTailMode = true;
        int minimal = 0;
        int sumOfNum = 0;
        int rearPointer = 0;
        int tailPointer = 0;

        while(tailPointer < nums.size()) {
            if(isTailMode) {
                sumOfNum += nums[tailPointer];
            } else {
                sumOfNum -= nums[rearPointer - 1];
            }

            if(sumOfNum >= target) {
                int subArrayLength = tailPointer - rearPointer + 1;
                if(minimal == 0) {
                    minimal = subArrayLength;
                } else {
                    minimal = minimal < subArrayLength ? minimal : subArrayLength;
                }

                // move rear pointer
                rearPointer++;
                isTailMode = false;
            } else {
                // move tail pointer
                tailPointer++;
                isTailMode = true;
            }
        }

        return minimal;
    }
};