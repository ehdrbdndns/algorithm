class Solution {
public:
    vector<int> getRow(int rowIndex) {
        if(rowIndex == 0) {
            return {1};
        }

        if(rowIndex == 1) {
            return {1, 1};
        }

        vector<int> result = {1, 2, 1};
        for(int i = 2; i < rowIndex; i++) {
            vector<int> temp = {1};
            
            for(int j = 0; j < result.size() - 1; j++) {
                int newValue = result[j] + result[j + 1];
                temp.push_back(newValue);
            }

            temp.push_back(1);

            result = temp;
        }

        return result;
    }
};