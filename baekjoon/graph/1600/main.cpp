#include <bits/stdc++.h>

using namespace std;

int K;
int W, H;

bool isOut(pair<int, int> curPosition, pair<int, int> nextPosition, 
vector<vector<int>> &map, vector<vector<pair<int, int>>> &visited) {
  // 지도 밖으로 나간 경우
  if(nextPosition.first < 0 || nextPosition.second < 0 || 
  nextPosition.second >= W || nextPosition.first >= H) return true;
  // 장애물인 경우
  if(map[nextPosition.first][nextPosition.second] == 1) return true;
  // 방문했거나 나의 순번이 더 빠를 경우
  // if(visited[nextPosition.first][nextPosition.second] != 0 && 
  // visited[curPosition.first][curPosition.second] >= visited[nextPosition.first][nextPosition.second]) return true;
  // 말 사용 횟수를 토대로... 방문 처리 확인해봅시다.
  if(visited[nextPosition.first][nextPosition.second].first != 0) {
    if(visited[curPosition.first][curPosition.second].second <= visited[nextPosition.first][nextPosition.second].second) {
        return true;
    }
  }

  return false;
}

int main() {
  // 왜 말이 되고싶니...? ㅎㅎ...
  // K번 외에는 상하좌우만 움직일 수 있음
  // 최소한의 동작으로 맨 왼위에서 맨 오아래로 이동한 횟수 구하기
  // 그냥 bfs 돌면서 값 구해지면 끝내면 되넴
  vector<pair<int, int>> dirList = {{1, 0}, {-1, 0}, {0, -1}, {0, 1}}; // 상하좌우
  vector<pair<int, int>> horseDirList = {
    {-1, -2}, {-2, -1}, // 좌위
    {1, -2}, {2, -1}, // 좌아
    {-1, 2}, {-2, 1},// 우위
    {1, 2}, {2, 1}, // 우아
  }; // 좌위 좌아 우위 우아
  queue<pair<int, int>> q; // {y, x, k}

  cin >> K;
  cin >> W >> H;

  vector<vector<int>> map(H, vector<int>(W, 0));
  vector<vector<pair<int, int>>> visited(H, vector<pair<int, int>>(W, {0, 0})); // {time, cur k}

  for(int i = 0; i < H; i++) {
    for(int j = 0; j < W; j++) {
      int input;
      cin >> input;
      map[i][j] = input;
    }
  }

  q.push({0, 0});
  visited[0][0] = {1, K};

  while(q.size()) {
    auto info = q.front();
    q.pop();
    
    int curY = info.first;
    int curX = info.second;

    // 원숭이 이동
    for(int i = 0; i < dirList.size(); i++) {
      int nextY = dirList[i].first + curY;
      int nextX = dirList[i].second + curX;

      // 종료 조건
      if(nextY == H - 1 && nextX == W - 1) {
        // 더 최소 범위인지 확인
        if(visited[nextY][nextX].first == 0) {
          visited[H - 1][W - 1] = {visited[curY][curX].first, 0};
        } else if(visited[nextY][nextX].first >= visited[curY][curX].first) {
          visited[H - 1][W - 1] = {visited[curY][curX].first, 0};
        }
        continue;
      }

      // 범위 밖으로 나갔는지 확인
      if(isOut({curY, curX}, {nextY, nextX}, map, visited)) continue;

      // 방문처리
      visited[nextY][nextX] = {visited[curY][curX].first + 1, visited[curY][curX].second};
      
      // 이동
      q.push({nextY, nextX});
    }

    // 말 이동
    if(visited[curY][curX].second <= 0) continue;
    
    for(int i = 0; i < horseDirList.size(); i++) {
      int nextY = horseDirList[i].first + curY;
      int nextX = horseDirList[i].second + curX;

      // 종료 조건
      if(nextY == H - 1 && nextX == W - 1) {
        // 더 최소 범위인지 확인
        if(visited[nextY][nextX].first == 0) {
          visited[H - 1][W - 1] = {visited[curY][curX].first, 0};
        } else if(visited[nextY][nextX].first >= visited[curY][curX].first) {
          visited[H - 1][W - 1] = {visited[curY][curX].first, 0};
        }
        continue;
      }

      if(isOut({curY, curX}, {nextY, nextX}, map, visited)) continue;

      // 방문처리
      visited[nextY][nextX] = {visited[curY][curX].first + 1, visited[curY][curX].second - 1};

      // 말 이동 횟수 삭제 및 이동
      q.push({nextY, nextX});
    }

    // cout << "------" << '\n';
    // for(int i = 0; i < H; i++) {
    //   for(int j = 0; j < W; j++) {
    //     cout << visited[i][j].first << " ";
    //   }
    //   cout << '\n';
    // }
  }


  if(visited[H - 1][W - 1].first == 0) {
    cout << -1;
  } else {
    cout << visited[H - 1][W - 1].first;
  }

  return 0;
}