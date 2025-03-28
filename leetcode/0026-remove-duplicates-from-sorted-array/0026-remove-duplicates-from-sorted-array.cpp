class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        int k = 0;
        int curIndex = 0;
        int curValue = -101;

        for(int i = 0; i < nums.size(); i++) {
            if(curValue < nums[i]) {
                nums[curIndex] = nums[i];
                curValue = nums[i];
                curIndex++;
                k++;
            }
        }

        return k;
    }
};