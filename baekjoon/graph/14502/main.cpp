#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>

using namespace std;

// 첫째 줄에 지도의 세로 크기 N과 가로 크기 M이 주어진다. (3 ≤ N, M ≤ 8)
// 둘째 줄부터 N개의 줄에 지도의 모양이 주어진다. 0은 빈 칸, 1은 벽, 2는 바이러스가 있는 위치이다. 
// 2의 개수는 2보다 크거나 같고, 10보다 작거나 같은 자연수이다.
// 빈 칸의 개수는 3개 이상이다.

int N, M;
vector<pair<int, int>> wallList;
vector<vector<int>> wallIndexList;
vector<pair<int, int>> dirList = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}}; // 상, 하, 좌, 우

void printVector(vector<vector<int>> &list) {
  for(int i = 0; i < list.size(); i++) {
    for(int j = 0; j < list[0].size(); j++) {
      cout << list[i][j] << " ";
    }

    cout << '\n';
  }
  cout << '\n';
}

void printMap(vector<vector<int>> &map) {
  for(int i = 0; i < map.size(); i++) {
    for(int j = 0; j < map[0].size(); j++) {
      cout << map[i][j] << " ";
    }
    cout << '\n';
  }
}

int getBlankCount(vector<vector<int>> &map) {
  int result = 0;
  for(int i = 0; i < map.size(); i++) {
    for(int j = 0; j < map[0].size(); j++) {
      if(map[i][j] == 0) result++;
    }
  }

  return result;
}

void getWallIndexList(int size) {
  vector<bool> visited(size, false);
  visited[0] = true;
  visited[1] = true;
  visited[2] = true;

  do {
    vector<int> wallIndex;
    for(int i = 0; i < visited.size(); i++) {
      if(visited[i]) {
        wallIndex.push_back(i);
      }
    }
    wallIndexList.push_back(wallIndex);
  } while(prev_permutation(visited.begin(), visited.end()));
}

int main() {

  cin >> N >> M;

  vector<vector<int>> initMap(N, vector<int>(M));
  queue<pair<int, int>> q;
  int blankCount = 0;

  for(int i = 0; i < N; i++) {
    for(int j = 0; j < M; j++) {
      int input;
      cin >> input;

      initMap[i][j] = input;
      
      if(input == 2) {
        q.push({i, j});
      }
      else if(input == 0) {
        blankCount++;
        wallList.push_back({i, j});
      }
    }
  }

  // 모든 벽의 경우의 수
  getWallIndexList(wallList.size());
  // cout << "wallIndexList: " << '\n';
  // printVector(wallIndexList);
  int result = 0;
  for(int i = 0; i < wallIndexList.size(); i++) {
    vector<vector<int>> copyMap(initMap); // 방문처리는 3으로 표기
    queue<pair<int, int>> newQ(q);

    // 벽 설치
    for(int j = 0; j < 3; j++) {
      auto wallIndex = wallIndexList[i][j];
      auto newWall = wallList[wallIndex];
      copyMap[newWall.first][newWall.second] = 1;
    }

    // bfs
    while(newQ.size()) {
      auto position = newQ.front();
      newQ.pop();

      copyMap[position.first][position.second] = 2; // 방문 표기

      for(int k = 0; k < dirList.size(); k++) {
        int newY = dirList[k].first + position.first;
        int newX = dirList[k].second + position.second;

        // 범위 체크
        if(newY < 0 || newX < 0 || newY >= N || newX >= M) continue;
        // 방문 체크
        if(copyMap[newY][newX] == 0) {
          copyMap[newY][newX] == 2;
          newQ.push({newY, newX});
        }
      }
    }

    int newBlankCount = getBlankCount(copyMap);
    // 빈칸 찾기
    if(result < newBlankCount) {
      result = newBlankCount;
      // cout << "-----------------" << '\n';
      // printMap(copyMap);
      // cout << "result: " << result << '\n';
    }
  }

  cout << result;

  return 0;
}