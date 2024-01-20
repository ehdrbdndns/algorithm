class Solution {
public:
    int find(int x) {
        if(x == root[x]) {
            return x;
        }
        return root[x] = find(root[x]);
    }
    void unionSet(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);
        if(rootX != rootY) {
            if(rank[rootX] > rank[rootY]) {
                root[rootY] = rootX;
            } else if(rank[rootX] < rank[rootY]) {
                root[rootX] = rootY;
            } else {
                root[rootY] = rootX;
                rank[rootX] += 1;
            }
        }
    }
    int findCircleNum(vector<vector<int>>& isConnected) {
        int n = isConnected.size();
        int result = n;
        // 초기화
        for(int i = 0; i < n; i++) {
            root.push_back(i);
            rank.push_back(1);
        }

        for(int i = 0; i < n; i++) {
            for(int j = 0; j < n; j++) {
                if(isConnected[i][j] == 1 && find(i) != find(j)) {
                    result--;
                    unionSet(i, j);   
                }
            }
        }
        
        return result;
    }  
private:
    vector<int> root;
    vector<int> rank;
};