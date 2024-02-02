#include <iostream>
#include <vector>
#include <queue>

using namespace std;

// 홀수 방향
vector<pair<int, int>> oddDirList = {{-1, 0}, {-1, 1}, {1, 0}, {1, 1}, {0, -1}, {0, 1}}; // 상좌, 상우, 하좌, 하우, 좌, 우(y, x)

// 짝수 방향
vector<pair<int, int>> evenDirList = {{-1, -1}, {-1, 0}, {1, -1}, {1, 0}, {0, -1}, {0, 1}}; // 상좌, 상우, 하좌, 하우, 좌, 우(y, x)

int H, W;

void bfs(queue<pair<int, int>> &q, vector<vector<int>> &map, int &result) {
  while(q.size()) {
    auto position = q.front();
    q.pop();

    // 방문했거나 건물일 경우 탐색 하지 않음
    if(map[position.first][position.second] != 0) continue;

    // 방문 처리
    map[position.first][position.second] = 2;


    for(int i = 0; i < oddDirList.size(); i++) {
      int newX;
      int newY;
      if(position.first % 2 == 0) {
        // 짝수일 경우
        newY = position.first + evenDirList[i].first;
        newX = position.second + evenDirList[i].second;
      } else {
        // 홀수일 경우
        newY = position.first + oddDirList[i].first;
        newX = position.second + oddDirList[i].second;
      }

      // 범위 밖인지 확인
      if(newX < 0 || newY < 0 || newY > H + 1 || newX > W + 1) continue;

      // 다음 장소가 건물인지 아닌지 확인 후 처리
      if(map[newY][newX] == 1) {
        // 건물일 경우
        result++;
        continue;
      } else {
        // 건물이 아닐 경우
        q.push({newY, newX});
      }
    }
  }
}

int main() {
  
  cin >> W >> H;

  // visited는 2로 처리
  vector<vector<int>> map(H + 2, vector<int>(W + 2, 0));

  for(int i = 1; i <= H; i++) { 
    for(int j = 1; j <= W; j++) {
      int input;
      cin >> input;
      map[i][j] = input;
    }
  }

  for(int i = 0; i <= H + 1; i++) {
    for(int j = 0; j <= W + 1; j++) {
      cout << map[i][j] << " ";
    }
    cout << '\n';
  }

  int result = 0;
  queue<pair<int, int>> q;
  for(int i = 0; i <= H + 1; i++) {
    if(i != 0 || i < H + 1) {
      if(map[i][0] != 2) q.push({i, 0});
      if(map[i][W + 1] != 2) q.push({i, W + 1});
    } else {
      for(int j = 0; j <= W + 1; j++) {
        if(map[i][j] == 2) continue;
        q.push({i, j});
      }
    }
    bfs(q, map, result);
  }

  // while(q.size()) {
  //   auto position = q.front();
  //   q.pop();

  //   // 방문했거나 건물일 경우 탐색 하지 않음
  //   if(map[position.first][position.second] != 0) continue;

  //   // 방문 처리
  //   map[position.first][position.second] = 2;


  //   for(int i = 0; i < oddDirList.size(); i++) {
  //     int newX;
  //     int newY;
  //     if(position.first % 2 == 0) {
  //       // 짝수일 경우
  //       newY = position.first + evenDirList[i].first;
  //       newX = position.second + evenDirList[i].second;
  //     } else {
  //       // 홀수일 경우
  //       newY = position.first + oddDirList[i].first;
  //       newX = position.second + oddDirList[i].second;
  //     }

  //     // 범위 밖인지 확인
  //     if(newX < 0 || newY < 0 || newY > H + 1 || newX > W + 1) continue;

  //     // 다음 장소가 건물인지 아닌지 확인 후 처리
  //     if(map[newY][newX] == 1) {
  //       // 건물일 경우
  //       result++;
  //       continue;
  //     } else {
  //       // 건물이 아닐 경우
  //       q.push({newY, newX});
  //     }
  //   }
  // }

  cout << result;

  return 0;
}