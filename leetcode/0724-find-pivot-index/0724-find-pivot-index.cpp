class Solution {
public:
    int pivotIndex(vector<int>& nums) {
        int result = -1;
        int totalSum = reduce(nums.begin(), nums.end(), 0);
        int sumOfNum = 0;
        for(int i = 0; i < nums.size(); i++) {
            if(i != 0) {
                sumOfNum += nums[i - 1];
            }

            totalSum -= nums[i];

            if(sumOfNum == totalSum) {
                result = i;
                break;
            }
        }

        return result;
    }
};