#include <iostream>
#include <vector>
#include <queue>
#include <unordered_map>
using namespace std;

#define START -100000000
#define END 100000000

vector<int> dirList = {-1, 1}; // 좌 우

int main() {
  // 불행도의 합이 최소가 되도록 하는 문제
  // 샘터를 기준으로 bfs를 돌면서 집을 설치하면 댐

  // N: 샘터 개수, K: 집 개수
  int N, K;
  // BFS 돌 떄 사용되는 queue(position, depth)
  queue<pair<int, unsigned long long>> q;
  // visited map
  unordered_map<unsigned long long, bool> visited;
  // 결과 값
  unsigned long long result = 0;

  cin >> N >> K;

  for(int i = 0; i < N; i++) {
    int input;
    cin >> input;
    q.push({input, 0});
    visited.insert(make_pair(input, true));
  }

  while(q.size() && K > 0) {
    auto info = q.front();
    q.pop();

    int position = info.first;
    unsigned long long depth = info.second;

    // 좌 우 탐색
    for(int i = 0; i < 2; i++) {
      int nextPosition = position - dirList[i];
      // 설치할 집이 있는지 확인
      if(K < 1) continue;
      // 범위에 벗어났는지 확인
      if(START > nextPosition || nextPosition > END) continue;
      // 이미 방문했는지 확인
      if(visited.find(nextPosition) != visited.end()) continue;

      // 방문 처리
      visited.insert(make_pair(nextPosition, true));
      q.push({nextPosition, depth + 1});
      // 집 개수 삭제
      K--;
      // 결과 값 추가
      result += depth + 1;

      // cout << "------" << "\n";
      // cout << "visited: " << nextPosition << " , " << depth + 1 << '\n';
    }
  }

  cout << result;
  return 0;
}