#include <iostream>
#include <vector>
#include <queue>

using namespace std;

vector<pair<int, int>> dirList = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}}; // 상하좌우

int main() {
  int M, N;
  int result = 0;
  int blankCount = 0;

  cin >> M >> N;

  int map[N + 1][M + 1];
  queue<pair<int, int>> q; // y, x
  for(int i = 1; i <= N; i ++) {
    for(int j = 1; j <= M; j++) {
      int input;
      cin >> input;
      map[i][j] = input;

      if(input == 1) {
        q.push({i, j});
      } else if(input == 0) {
        blankCount++;
      }
    }
  }

  if(blankCount == 0) {
    cout << "0";
    return 0;
  }

  while(q.size()) {
    auto position = q.front(); 
    q.pop();

    for(int i = 0; i < dirList.size(); i++) {
      auto dir = dirList[i];
      int nextY = dir.first + position.first;
      int nextX = dir.second + position.second;

      if(nextY < 1 || nextX < 1 || nextY > N || nextX > M) continue;
      if(map[nextY][nextX] != 0) continue;

      map[nextY][nextX] = map[position.first][position.second] + 1;
      if(result < map[nextY][nextX]) {
        result = map[nextY][nextX];
      }
      blankCount--;
      q.push({nextY, nextX});
    }
  }

  if(blankCount > 0) {
    cout << "-1";
    return 0;
  }

  cout << result - 1;
  return 0;
}