class Solution {
public:
    vector<vector<int>> allPathsSourceTarget(vector<vector<int>>& graph) {
        vector<vector<int>> result;
        vector<vector<int>> stack = {{0}};
        while(stack.size()) {
            auto path = stack.back();
            int lastIndex = path.back();
            stack.pop_back();

            if(lastIndex == graph.size() - 1) {
                result.push_back(path);
            }

            for(int i = 0; i < graph[lastIndex].size(); i++) {
                vector<int> newPath(path);
                newPath.push_back(graph[lastIndex][i]);
                stack.push_back(newPath);
            }

            // for(int i = 0; i < stack.size(); i++) {
            //     for(int j = 0; j < stack[i].size(); j++) {
            //         cout << stack[i][j] << ' ';
            //     }
            //     cout << '\n';
            // }
        }

        return result;
    }
};