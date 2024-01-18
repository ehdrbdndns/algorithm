#include <algorithm>

class Solution {
public:
    string addBinary(string a, string b) {
        int aSize = a.size();
        int bSize = b.size();
        int carry = 0;
        int maxSize = aSize > bSize ? aSize : bSize;
        string result;
        for(int i = 0; i < maxSize; i++) {
            int aDigit = 0;
            if(!a.empty()) {
                aDigit = a.back() - '0';
                a.pop_back();
            }
            int bDigit = 0;
            if(!b.empty()) {
                bDigit = b.back() - '0';
                b.pop_back();
            }
            int sumOfDigit = aDigit + bDigit + carry;

            switch(sumOfDigit) {
                case 0:
                    result += '0';
                    carry = 0;
                    break;
                case 1:
                    result += '1';
                    carry = 0;
                    break;
                case 2:
                    result += '0';
                    carry = 1;
                    break;
                case 3:
                    result += '1';
                    carry = 1;
                    break;
                default:
                    break;
            }
        }

        if(carry == 1) {
            result += '1';
        }

        reverse(result.begin(), result.end());
        return result;
    }
};