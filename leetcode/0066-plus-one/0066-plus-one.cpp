class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        reverse(digits.begin(), digits.end());

        int digit = 0;
        bool isUpper = true;
        while(isUpper) {
            int num = digits[digit] + 1;
            if(num >= 10) {
                digits[digit] = 0;
                digit++;      
            } else {
                digits[digit] = num;
                isUpper = false;
            }

            if(digit >= digits.size()) {
                digits.push_back(0);
            }
        }

        reverse(digits.begin(), digits.end());

        return digits;
    }
};