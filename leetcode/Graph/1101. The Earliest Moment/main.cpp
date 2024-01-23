class UnionFind {
private:
    vector<int> parent;
    vector<int> rank;
    int parentCount;
public:
    UnionFind(int size) {
        parent.resize(size);
        rank.resize(size);
        for(int i = 0; i < size; i++) {
            parent[i] = i;
            rank[i] = 1;
        }
        parentCount = size - 1;
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
            if(rank[parentX] < rank[parentY]) {
                parent[parentX] = parentY;
            } else if(rank[parentX] > rank[parentX]) {
                parent[parentY] = parentX;
            } else {
                parent[parentY] = parentX;
                rank[parentX] += 1;
            }
            parentCount--;
        }
    }
    bool isDone() {
        return parentCount == 0;
    }
};
bool comp(vector<int> a, vector<int> b) {
    return a[0] < b[0];
};
class Solution {
public:
    int earliestAcq(vector<vector<int>>& logs, int n) {
        UnionFind uf(n);

        sort(logs.begin(), logs.end(), comp);

        for(int i = 0; i < logs.size(); i++) {
            uf.unionSet(logs[i][1], logs[i][2]);
            if(uf.isDone()) {
                return logs[i][0];
            }
        }

        return -1;
    }
};