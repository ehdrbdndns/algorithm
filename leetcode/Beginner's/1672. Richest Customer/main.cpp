class Solution {
public:
    int maximumWealth(vector<vector<int>>& accounts) {
        int result = 0;
        int n = accounts.size();
        int m = accounts[0].size();
        for(int i = 0; i < n; i++) {
            int sumOfWealth = 0;
            for(int j = 0; j < m; j++) {
                sumOfWealth += accounts[i][j];
            }
            result = result < sumOfWealth ? sumOfWealth : result;
        }

        return result;
    }
};