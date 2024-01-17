class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        int row = 0; // 가로
        int col = 0; // 세로
        int totalSize = matrix.size() * matrix[0].size();
        int maxRow = matrix[0].size();
        int maxCol = matrix.size();
        int minRow = -1;
        int minCol = -1;
        int dirList[4][2] = {{1, 0}, {0, 1}, {-1, 0}, {0, -1}}; // right, bottom, left, top;
        int limitSizeList[4] = {maxRow, maxCol, minRow, minCol}; // right, bottom, left, top;
        int dirIndex = 0;

        vector<int> result = {};
        for(int i = 0; i < totalSize; i++) {
            result.push_back(matrix[col][row]);
            // cout << matrix[col][row] << endl;
            int newRow = row + dirList[dirIndex][0];
            int newCol = col + dirList[dirIndex][1];

            switch(dirIndex) {
                case 0: 
                    // right
                    if(newRow == limitSizeList[dirIndex]) {
                        // 범위가 넘침
                        limitSizeList[3] += 1; // top    
                        dirIndex = (dirIndex + 1) % 4;
                        newRow = row;
                        newCol = col + 1;
                    }
                    break;
                case 1:
                    // bottom
                    if(newCol == limitSizeList[dirIndex]) {
                        // 범위가 넘침
                        limitSizeList[0] -= 1; // right
                        dirIndex = (dirIndex + 1) % 4;
                        newRow = row - 1;
                        newCol = col;
                    }
                    break;
                case 2:
                    // left
                    if(newRow == limitSizeList[dirIndex]) {
                        // 범위가 넘침
                        limitSizeList[1] -= 1; // bottom
                        dirIndex = (dirIndex + 1) % 4;
                        newRow = row;
                        newCol = col - 1;
                    }
                    break;
                case 3:
                    // top
                    if(newCol == limitSizeList[dirIndex]) {
                        // 범위가 넘침
                        limitSizeList[2] += 1; // left
                        dirIndex = (dirIndex + 1) % 4;
                        newRow = row + 1;
                        newCol = col;
                    }
                    break;
                default:
                    break;
            }

            row = newRow;
            col = newCol;
        }

        return result;
    }
};