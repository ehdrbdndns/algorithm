class Solution {
public:
    vector<int> findDiagonalOrder(vector<vector<int>>& mat) {
        vector<int> result = {};
        int row = 0; // 가로
        int col = 0; // 세로
        int n = mat[0].size() - 1; // row 길이
        int m = mat.size() - 1; // col 길이
        bool isRed = true;
        while(true) {
            // cout << mat[col][row] << endl;
            result.push_back(mat[col][row]);
            if(row == n && col == m) break;
            if(isRed) {
                if(col - 1 < 0 || row >= n) {
                    // 범위를 넘침
                    isRed = !isRed;
                    if(row == n) {
                        col += 1;
                    } else {
                        row += 1;
                    }
                } else {
                    row += 1;
                    col -= 1;
                }
            } else {
                if(row - 1 < 0 || col >= m) {
                    // 범위를 넘침
                    isRed = !isRed;
                    if(col == m) {
                        row += 1;
                    } else {
                        col += 1;
                    }
                } else {
                    row -= 1;
                    col += 1;
                }
            }
        }

        return result;
    }
};