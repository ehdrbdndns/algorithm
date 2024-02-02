#include <iostream>
#include <vector>
#include <queue>

using namespace std;

bool isSuccess = false;

void dfs(int depth, int node, vector<bool> &visited, vector<vector<int>> &map) {
  if(depth == 5) {
    isSuccess = true;
    return;
  }

  for(int i = 0; i < map[node].size(); i++) {
    if(!visited[map[node][i]]) {
      visited[map[node][i]] = true;
      dfs(depth + 1, map[node][i], visited, map);

      if(isSuccess) break;
    }
  }

  visited[node] = false;
}

int main() {

  int N, M;

  cin >> N >> M;

  vector<vector<int>> map(N);
  for(int i = 0; i < M; i++) {
    int first, second;
    cin >> first >> second;

    map[first].push_back(second);
    map[second].push_back(first);
  }

  bool result = false;

  for(int i = 0; i < N; i++) {
    vector<bool> visited(N, false);
    visited[i] = true;
    dfs(1, i, visited, map);

    if(isSuccess) break;
  }

  if(isSuccess) {
    cout << 1;
  } else {
    cout << 0;
  }
  return 0;
}