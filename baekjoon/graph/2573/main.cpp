#include <iostream>
#include <vector>
#include <queue>

using namespace std;

int main() {
  // 빙산 높이가 2차원 배열의 값
  // 동서남북에 있는 0값의 개수만큼 높이 감소 -> 바다로부터 bfs
  // 두 덩어리 이상으로 나뉘어지는 빙산의 최소 년도를 구해라 -> bfs 이후 빙산 하나를 가지고 
  //                                  bfs를 돌면서 개수 체크해서 0이 아니면 프로그램 종료
  // 두 덩어리로 나뉘는 케이스가 없으면 0을 출력 

  int N, M;
  int time = 0; // 연도
  int iceCount = 0;
  bool isDivide = false;
  queue<pair<int, int>> q; // { y, x }
  vector<pair<int,int>> dirList = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}}; // 상, 하, 좌, 우

  cin >> N >> M;

  vector<vector<int>> map(N, vector<int>(M));

  // 지도 입력 받기
  for(int i = 0; i < N; i++) {
    for(int j = 0; j < M; j++) {
      int input;
      cin >> input;
      map[i][j] = input;

      if(input > 0) iceCount++;
    }
  }

  // 빙산이 나뉘거나 빙산이 모두 녹으면 프로그램 종료
  while(iceCount != 0 && !isDivide) {
    // 1년 추가
    time++;
    
    // 빙산 녹이기
    vector<vector<bool>> visited(N, vector<bool>(M, false));
    vector<pair<int, int>> meltIcePositions; 
    vector<pair<int, int>> icePositions;
    visited[0][0] = true;
    q.push({0, 0});
    while(q.size()) {
      auto position = q.front();
      q.pop();

      for(int i = 0; i < 4; i++) {
        int newY = dirList[i].first + position.first;
        int newX = dirList[i].second + position.second;

        // 범위 밖인지 확인
        if(newY < 0 || newX < 0 || newY >= N || newX >= M) continue;

        // 이미 방문 했는지 확인
        if(visited[newY][newX]) continue;

        // 얼음인지 확인
        if(map[newY][newX] > 0) {
          meltIcePositions.push_back({newY, newX});
          // map[newY][newX]--;
          // // 얼음이 다 녹았는지 확인
          // if(map[newY][newX] == 0) {
          //   iceCount--;
          // } else {
          //   icePositions.push_back({newY, newX});
          // }
        } else {
          // 바다일 경우 방문
          visited[newY][newX] = true;
          q.push({newY, newX});
        }
      }
    }

    // 얼음 녹이기
    for(int i = 0; i < meltIcePositions.size(); i++) {
      auto position = meltIcePositions[i];
      
      if(map[position.first][position.second] == 0) continue;

      if(map[position.first][position.second] == 1) {
        iceCount--;
      } else {
        icePositions.push_back({position.first, position.second});
      };

      map[position.first][position.second]--;
    }

    // 빙산 나눠졌는지 체크하기
    visited.clear();
    visited.resize(N, vector<bool>(M, false));
    if(icePositions.size() > 0) q.push(icePositions.front());
    int curIceCount = 0;
    while(q.size()) {
      auto position = q.front();
      q.pop();

      for(int i = 0; i < 4; i++) {
        int newY = dirList[i].first + position.first;
        int newX = dirList[i].second + position.second;

        // 범위 밖인지 확인
        if(newY < 0 || newX < 0 || newY >= N || newX >= M) continue;

        // 이미 방문했는지 확인
        if(visited[newY][newX]) continue;

        // 얼음인지 확인
        if(map[newY][newX] > 0) {
          visited[newY][newX] = true;
          curIceCount++;
          q.push({newY, newX});
        }
      }
    }

    if(curIceCount != iceCount) {
        isDivide = true;
    }

    // print
    // cout << "---------" << '\n';
    // for(int i = 0; i <N; i++) {
    //   for(int j = 0; j < M; j++) {
    //     cout << map[i][j] << " ";
    //   }
    //   cout << '\n';
    // }
  }

  if(isDivide) {
    cout << time;
  } else {
    cout << 0;
  }

  return 0;
}