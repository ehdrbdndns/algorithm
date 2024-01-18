class Solution {
public:
    vector<vector<int>> generate(int numRows) {
        vector<vector<int>> result;
        for(int i = 0; i < numRows; i++) {
            if(i == 0) {
                result.push_back({1});
                continue;
            }
            vector<int> newRow = {1};
            for(int j = 1; j < i; j++) {
                newRow.push_back(result[i-1][j-1] + result[i-1][j]);
            }
            newRow.push_back(1);
            result.push_back(newRow);
        }
        return result;
    }
};