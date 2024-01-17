class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        int i = digits.size() - 1;
        while(true) {
            int digit = digits[i];
            digit += 1;
            if(digit == 10) {
                digits[i] = 0;
            } else {
                digits[i] = digit;
                break;
            }

            i--;

            if(i < 0) {
                digits.insert(digits.begin(), 1);
                break;
            }
        }
        
        return digits;
    }
};