class Solution {
public:
    string reverseWords(string s) {
        istringstream iss(s);

        string word;
        vector<string> wordList = {};
        while(iss >> word) {
            wordList.push_back(word + " ");
        }

        reverse(wordList.begin(), wordList.end());

        string reversedWords = "";
        for(string word : wordList) {
            reversedWords += word;
        }

        return reversedWords.substr(0, reversedWords.size() - 1);
    }
};