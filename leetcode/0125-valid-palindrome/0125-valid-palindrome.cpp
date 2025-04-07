class Solution {
public:
    bool isPalindrome(string s) {
        vector<char> palindrome = {};

        for(char c : s) {
            if(('A' <= c && c <= 'Z') ||
            'a' <= c && c <= 'z' ||
            '0' <= c && c <= '9') {
                palindrome.push_back(tolower(c));
            }
        }

        bool result = true;
        int tail = palindrome.size() - 1;
        for(int rear = 0; rear < palindrome.size() / 2; rear++) {
            if(palindrome[rear] != palindrome[tail]) {
                result = false;
                break;
            }
            tail--;
        }

        return result;
    }
};