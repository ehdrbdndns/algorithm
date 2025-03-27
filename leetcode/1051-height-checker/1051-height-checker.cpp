class Solution {
public:
    int heightChecker(vector<int>& heights) {
        int result = 0;

        vector<int> sortedHeights = heights;
        sort(heights.begin(), heights.end());

        for(int i = 0; i < heights.size(); i++) {
            int height = heights[i];
            int sortedHeight = sortedHeights[i];

            if(height != sortedHeight) {
                result++;
            }
        }

        return result;
    }
};