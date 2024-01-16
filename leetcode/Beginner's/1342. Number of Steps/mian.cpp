class Solution {
public:
    int numberOfSteps(int num) {
        int result = 0;
        while(num != 0) {
            if(num % 2 == 0) {
                // 짝수
                num /= 2;
            } else {
                // 홀수
                num -= 1;
            }
            result++;
        }

        return result;
    }
};