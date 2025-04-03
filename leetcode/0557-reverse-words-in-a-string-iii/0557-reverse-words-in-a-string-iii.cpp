class Solution {
public:
    string reverseWords(string s) {
        string result = "";
        vector<char> temp = {};
        for(char c : s) {
            if(c == ' '){
                reverse(temp.begin(), temp.end());
                for(char i : temp) {
                    result += i;
                }
                result += " ";
                temp = {};
            } else {
                temp.push_back(c);
            }
        }

        reverse(temp.begin(), temp.end());
        for(char i : temp) {
            result += i;
        }

        return result;
    }
};