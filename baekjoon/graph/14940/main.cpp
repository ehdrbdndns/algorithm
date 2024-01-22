#include <iostream>
#include <vector>
#include <queue>

using namespace std;

int main() {
  int N, M;
  cin >> N >> M;

  queue<pair<int, int>> q;
  pair<int, int> targetIndex;
  int map[N + 1][M + 1];
  int newMap[N + 1][M + 1];
  
  for(int i = 1; i <= N; i++) {
    for(int j = 1; j <= M; j++) {
      char input;
      cin >> input;
      map[i][j] = input - '0';
      newMap[i][j] = -1;
      if(input == '2') {
        newMap[i][j] = 0;
        targetIndex = {i, j};
      }
    }
  }

  vector<pair<int, int>> dirList = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}}; // 상하좌우
  
  q.push(targetIndex);
  while(q.size()) {
    auto position = q.front();
    q.pop();
    for(int i = 0; i < dirList.size(); i++) {
      auto dir = dirList[i];

      int newY = dir.first + position.first;
      int newX = dir.second + position.second;

      if(newY < 1 || newX < 1 || newY > N || newX > M) continue;
      if(map[newY][newX] == 0 || newMap[newY][newX] != -1) continue;
      newMap[newY][newX] = newMap[position.first][position.second] + 1;
      q.push({newY, newX});
    }
  }


// newMap[targetIndex.first][targetIndex.second] = 0;

  for(int i = 1; i <= N; i++) {
    for(int j = 1; j <= M; j++) {
      if(map[i][j] == 0) {
        cout << 0 << " ";
      } else {
        cout << newMap[i][j] << " ";
      }
    }
    cout << '\n';
  }

  return 0;
}