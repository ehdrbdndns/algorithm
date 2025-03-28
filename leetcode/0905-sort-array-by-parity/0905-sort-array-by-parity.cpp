class Solution {
public:
    vector<int> sortArrayByParity(vector<int>& nums) {
        int evenPointer = 0;
        vector<int> oddList = {};

        for(int i = 0; i < nums.size(); i++) {
            if(nums[i] % 2 == 0) {
                // 짝수
                nums[evenPointer] = nums[i];
                evenPointer++;
            } else {
                // 홀수
                oddList.push_back(nums[i]);
            }
        }

        for(int i = 0; i < oddList.size(); i++) {
            nums[evenPointer + i] = oddList[i];
        }

        return nums;
    }
};