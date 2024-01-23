class UnionFind {
private:
    vector<int> parent;
    vector<int> rank;
public:
    UnionFind(int size) {
        parent.resize(size);
        rank.resize(size);

        for(int i = 0; i < size; i++) {
            parent[i] = i;
            rank[i] = 1;
        }
    }
    void unionSet(int x, int y) {
        int parentX = find(x);
        int parentY = find(y);
        if(parentX != parentY) {
           if(rank[parentX] < rank[parentY]) {
               parent[parentX] = parentY;
           } else if(rank[parentX] > rank[parentY]) {
               parent[parentY] = parentX;
           } else {
               parent[parentY] = parentX; 
               rank[parentX] += 1;
           }
        }
    }
    int find(int x) {
        // root 찾기
        if(x == parent[x]) {
            return x;
        }
        return parent[x] = find(parent[x]);
    }
    void showParent() {
        for(int i = 0; i <parent.size(); i++) {
            cout << parent[i] << " ";
        }
    }
};

class Solution {
public:
    int countComponents(int n, vector<vector<int>>& edges) {
        UnionFind uf(n);

        for(int i = 0; i < edges.size(); i++) {
            uf.unionSet(edges[i][0], edges[i][1]);
        }

        set<int> parentSet;
        for(int i = 0; i < n; i++) {
            parentSet.insert(uf.find(i));
        }

        return parentSet.size();
    }
};