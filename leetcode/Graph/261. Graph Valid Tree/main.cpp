class UnionFind {
private:
    vector<int> parent;
    vector<int> rank;
    int count;

public:
    UnionFind(int size) {
        count = size;
        parent.resize(size);
        rank.resize(size);

        for (int i = 0; i < size; i++) {
            parent[i] = i;
            rank[i] = 1;
        }
    }
    int find(int x) {
        if(x == parent[x]) {
            return x;
        }
        return parent[x] = find(parent[x]);
    }
    void unionSet(int x, int y) {
        int parentX = find(x);
        int parentY = find(y);
        if(parentX != parentY) {
            if(rank[parentX] > rank[parentY]) {
                parent[parentY] = parentX;
            } else if(rank[parentX] < rank[parentY]) {
                parent[parentX] = parentY;
            } else {
                parent[parentX] = parentY;
                rank[parentY] += 1;
            }
        }
    }
    bool isConnected(int x, int y) {
        return find(x) == find(y);
    }
    bool isValidTree() {
        int root = parent[0];
        for(int i = 1; i < count; i++) {
            if(!isConnected(root, i)) {
                return false;
            }
        }
        return true;
    }
};

class Solution {
public:
    bool validTree(int n, vector<vector<int>>& edges) {
        UnionFind uf(n);
        for(int i = 0; i < edges.size(); i++) {
            if(uf.isConnected(edges[i][0], edges[i][1])) {
                return false;
            }
            uf.unionSet(edges[i][0], edges[i][1]);
        }
        return uf.isValidTree();
    }
};