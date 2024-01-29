#include <iostream>
#include <vector>
#include <queue>

using namespace std;

int main() {

  int N, M, T;
  vector<vector<int>> dirList = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}}; // 상하좌우
  cin >> N >> M >> T;

  pair<bool, int> map[N + 1][M + 1]; // isWeapon, time
  bool visited[2][N + 1][M + 1];
  for(int i = 1; i <= N; i++) {
    for(int j = 1; j <= M; j++) {
      int input;
      cin >> input;

      map[i][j] = {false, input};
      visited[0][i][j] = false;
      visited[1][i][j] = false;
    }
  }

  queue<pair<int, int>> q; // {position}

  q.push(make_pair(1, 1));

  while(q.size() && map[N][M].second == 0) {
    auto curInfo = q.front();
    q.pop();
    auto position = curInfo;
    bool isWeapon = map[position.first][position.second].first;
    int curTime =  map[position.first][position.second].second;

    visited[0][position.first][position.second] = true;
    if(curTime >= T) continue;

    for(int i = 0; i < dirList.size(); i++) {
      int nextY = dirList[i][0] + position.first;
      int nextX = dirList[i][1] + position.second;

      if(nextY < 1 || nextX < 1 || nextY > N || nextX > M) continue;


      if(isWeapon && !visited[1][nextY][nextX]) {
        map[nextY][nextX].second = curTime + 1;
        map[nextY][nextX].first = true;
        visited[1][nextY][nextX] = true;
        q.push(make_pair(nextY, nextX));
        continue;
      } 

      // 이미 방문한 경우는 패스
      if(visited[0][nextY][nextX]) continue;
      
      // 벽인지 경로인지 확인
      if(map[nextY][nextX].second == 0){
        map[nextY][nextX].second = curTime + 1;
        map[nextY][nextX].first = false;
        q.push(make_pair(nextY, nextX));
      } else if(map[nextY][nextX].second == 2) {
        map[nextY][nextX].second = curTime + 1;
        map[nextY][nextX].first = true;
        q.push(make_pair(nextY, nextX));
      }
    }

    // log
    // cout << position.first << " " << position.second << "--------------" << '\n';
    // for(int i = 1; i <= N; i++) {
    //   for(int j = 1; j <= M; j++) {
    //     cout << map[i][j].second << " ";
    //   }
    //   cout << '\n';
    // }
  }

  if(map[N][M].second == 0) {
    cout << "Fail";
  } else {
    cout << map[N][M].second;
  }

  return 0;
}