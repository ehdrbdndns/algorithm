#include <iostream>
#include <vector>
#include <queue>

using namespace std;

int main() {
  // 트리의 지름을 구하는 문제
  // 최 상위 루트는 항상 1이고 최소 힙의 모양을 유지한다.
  // 간선의 가중치 최대 값은 100이다.

  // 해결 방법
  // 각 노드에서 bfs 혹은 dfs를 돌며 각 노드를 방문하고 가중치를 더해 가장 큰 가중치의 정보만 따로 map에 저장한다.

  int N;
  cin >> N;

  // 그래프를 담는 변수
  vector<vector<pair<int, int>>> map(N + 1); // pair = {노드, 가중치}
  // 가장 큰 길이
  int result = 0;

  for(int i = 0; i < N - 1; i++) {
    int parent;
    int child;
    int value;
    for(int j = 0; j < 3; j++) {
      if(j == 0) {
        cin >> parent;
      } else if(j == 1) {
        cin >> child;
      } else if(j == 2) {
        cin >> value;
      }
    }

    map[parent].push_back({child, value});
    map[child].push_back({parent, value});
  }

  queue<pair<int, int>> q;
  for(int i = 1; i <= N; i++) {
    // 방문 테이블 생성
    vector<bool> visited(N, false);

    // 처음 방문할 노드
    q.push({i, 0});
    visited[i] = true;

    //bfs
    while(q.size()) {
      // cur node
      auto curInfo = q.front();
      int curNode = curInfo.first;
      int curValue = curInfo.second;
      q.pop();

      // next Node
      for(int i = 0; i < map[curNode].size(); i++) {
        int nextNode = map[curNode][i].first;
        int nextValue = map[curNode][i].second + curValue;

        // 방문 했는지 확인
        if(visited[nextNode]) continue;

        // 가장 큰 가중치 인지 확인
        if(result < nextValue) result = nextValue;

        // 방문 처리
        q.push({nextNode, nextValue});
        visited[nextNode] = true;
      }
    }
  }

  cout << result;

  return 0;
}