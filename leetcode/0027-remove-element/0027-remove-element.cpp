class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
        int k = 0;
        int writePointer = 0;
        for(int i = 0; i < nums.size(); i++) {
            int num = nums[i];
            if(num != val) {
                nums[writePointer] = num;
                writePointer++;
                k++;
            }
        }

        return k;
    }
};