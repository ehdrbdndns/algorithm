class Solution {
public:
    int getRightSum(vector<int>& nums, int& startIndex) {
        int result = 0;
        for (int i = startIndex + 1; i < nums.size(); i++) {
            result += nums[i];
        }
        return result;
    }
    int pivotIndex(vector<int>& nums) {
        int result = -1;
        int leftSum = 0;
        int rightSum = getRightSum(nums, leftSum);
        for (int i = 0; i < nums.size(); i++) {
            if (leftSum == rightSum) {
                result = i;
                break;
            }
            if (i == nums.size() - 1)
                break;
            leftSum += nums[i];
            rightSum -= nums[i + 1];
        }

        return result;
    }
};