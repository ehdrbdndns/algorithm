class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int zeroCount = 0;
        int writePointer = 0;
        for(int readPointer = 0; readPointer < nums.size(); readPointer++) {
            int value = nums[readPointer];
            if(value != 0) {
                nums[writePointer] = value;
                writePointer++;
            } else {
                zeroCount++;
            }
        }

        for(int i = 0; i < zeroCount; i++) {
            nums[nums.size() - 1 - i] = 0;
        }
    }
};