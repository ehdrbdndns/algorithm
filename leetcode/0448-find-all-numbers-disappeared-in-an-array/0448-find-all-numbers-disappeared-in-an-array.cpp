class Solution {
public:
    vector<int> findDisappearedNumbers(vector<int>& nums) {
        int n = nums.size();
        vector<int> resultList = {};

        // 정렬
        sort(nums.begin(), nums.end());

        // 중복 제거
        set<int> reducedSet = set(nums.begin(), nums.end());
        
        for(int i = 1; i <= n; i++) {
            if(reducedSet.find(i) == reducedSet.end()) {
                resultList.push_back(i);
            }
        }

        return resultList;
    }
};