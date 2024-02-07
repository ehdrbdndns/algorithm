#include <iostream>
#include <vector>
#include <queue>

using namespace std;

// 격자판 크기
int N, M;
// 직사각형 크기
int H, W;
// 시작 지점
int Sr, Sc;
// 끝 지점
int Fr, Fc;

vector<vector<int>> map;
vector<vector<int>> visited;
vector<pair<int, int>> dirList = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}}; // 상하좌우

// bool isWall(pair<int, int> position, int dir) {
//   int squarY = position.first + H - 1;
//   int squarX = position.second + W - 1;
//   bool isWall = false;
//   if(map[position.first][position.second] == 1) return true;
//   if(dir == 0) {
//     // 상
//   } else if(dir == 1) {
//     // 하
//     if(squarY > N) return true;
//     for(int j = position.second; j <= squarX; j++) {
//       if(map[squarY][j] == 1) {
//         isWall = true;
//         break;
//       }
//     }
//   } else if(dir == 2) {
//     // 좌
//   } else if(dir == 3) {
//     // 우
//     if(squarX > M) return true;
//     for(int j = position.first; j <= squarY; j++) {
//       if(map[j][squarX] == 1) {
//         isWall = true;
//         break;
//       }
//     }
//   }

//   return true;
// }

bool isWall(pair<int, int> position) {
  int squarY = position.first + H - 1;
  int squarX = position.second + W - 1;
  
  if(squarX > M || squarY > N) return true;

  // 상
  for(int i = position.second; i <= squarX; i++) {
    if(map[position.first][i] == 1) return true;
  }
  // 하
  for(int i = position.second; i <= squarX; i++) {
    if(map[squarY][i] == 1) return true;
  }
  // 좌
  for(int i = position.first; i <= squarY; i++) {
    if(map[i][position.second] == 1) return true;
  }
  // 우
  for(int i = position.first; i <= squarY; i++) {
    if(map[i][squarX] == 1) return true;
  }

  return false;
}

int main() {
  cin >> N >> M;

  map.resize(N + 1, vector<int>(M + 1));
  visited.resize(N + 1, vector<int>(M + 1, -1));

  for(int i = 1; i <= N; i++) {
    for(int j = 1; j <= M; j++) {
      int input;
      cin >> input;
      map[i][j] = input;
    }
  }

  cin >> H >> W >> Sr >> Sc >> Fr >> Fc; 

  // ==
  queue<pair<int, int>> q;
  q.push({Sr, Sc});
  visited[Sr][Sc] = 0;

  while(q.size()) {
      //print
    // cout << "----" << '\n';
    // for(int i = 1; i <= N; i++) {
    //   for(int j = 1; j <= M; j++) {
    //     cout << visited[i][j] << " ";
    //   }

    //   cout << "\n";
    // }
    // cout << "----" << '\n';

    auto position = q.front();
    q.pop();

    for(int i = 0; i < 4; i++) {
      int newY = dirList[i].first + position.first;
      int newX = dirList[i].second + position.second;

      // 범위에 벗어났는지
      if(newY < 1 || newX < 1 || newY > N || newX > M) continue;

      // 직사각형에 벽이 있는지 혹은 범위를 벗어났는지
      if(isWall({newY, newX})) continue;
      // int squarX = newX + W - 1;
      // int squarY = newY + H - 1;
      // bool isWall = false;
      // if(map[newY][newX] == 1) continue;
      // if(i == 1) {
      //   // 하
      //   if(squarY > N) continue;
      //   for(int j = newX; j <= squarX; j++) {
      //     if(map[squarY][j] == 1) {
      //       isWall = true;
      //       break;
      //     }
      //   }
      // } else if(i == 3) {
      //   // 우
      //   if(squarX > M) continue;
      //   for(int j = newY; j <= squarY; j++) {
      //     if(map[j][squarX] == 1) {
      //       isWall = true;
      //       break;
      //     }
      //   }
      // }

      // if(isWall) continue;

      int newDepth = visited[position.first][position.second] + 1;

      // 최단거리인지
      if(visited[newY][newX] != -1) continue;

      // 방문처리 + 거리 입력
      visited[newY][newX] = visited[position.first][position.second] + 1;
        
      // 최종 목적지인 경우
      if(newY == Fr && newX == Fc) break;

      q.push({newY, newX});
    } 
  }

  cout << visited[Fr][Fc];

  return 0;
}