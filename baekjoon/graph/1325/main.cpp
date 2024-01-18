#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;
#define N_MAX 10001
#define M_MAX 100001

struct item {
  int index;
  int value;
};

vector<int> v[M_MAX];
bool visited[N_MAX];
vector<item> hack(N_MAX);

bool comp(int i, int j) {
  return i < j;
}

void resetVisit(int &n) {
    for (int i = 0; i <= n; i++) {
        visited[i] = 0;
    }
}

void dfs(int k, int &count) {
  visited[k] = true;
  for(int i = 0; i < v[k].size(); i++) {
    int node = v[k][i];
    if(!visited[node]) {
      count += 1;
      dfs(node, count);
    }
  }
}

int main() {
  int n, m;
  cin >> n >> m;
  for(int i = 0; i < m; i++) {
    int a, b;
    cin >> a >> b;
    v[b].push_back(a);
  }

  int max = -1;
  for(int i = 1; i <= n; i++) {
    int count = 0;
    dfs(i, count);
    hack[i].index = i;
    hack[i].value = count;
    if(max < hack[i].value) {
      max = hack[i].value;
    }
    resetVisit(n);
  }
  
  vector<int> result = {};
  for(int i = 1; i <= n; i++) {
    if(max == hack[i].value) {
      result.push_back(hack[i].index);
    }
  }

  sort(result.begin(), result.end(), comp);

  for(int i = 0; i < result.size(); i++) {
    cout << result[i] << " ";
  }

  return 0;
}