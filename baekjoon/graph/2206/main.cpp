#include <iostream>
#include <vector>
#include <queue>

using namespace std;

// 최단 경로 푸는 문제인데 벽을 최대 한 개까지 부술 수 있음
// 벽을 부순다는 것은 3차원 배열을 사용해 벽을 부쉈던 이력을 체크하는 것이 빠름 
// 큐에는 위치 데이터와 벽을 부술 수 있는 권한에 대한 데이터, 현재까지 이동 횟수에 대한 데이터를 가진다.
// visited는 3차원 배열로 벽을 부섯울 경우를 3차원으로 체크해 나눈다.
// 해서 Q를 통해 벽을 부술 수 있는 횟수가 있으면 벽을 부수고 이동하게 한다. 
// 벽을 부술 때는 나의 경로가 최단일 경우에만 부술 수 있게 허용한다.

int main() {

  int N, M;

  cin >> N >> M;

  vector<vector<int>> map(N + 1, vector<int>(M + 1));
  vector<vector<vector<bool>>> visited(3, vector<vector<bool>>(N + 1, vector<bool>(M + 1, false)));
  queue<pair<pair<int, int>, pair<bool, int>>> q; // {position, {break, time}}
  vector<pair<int, int>> dirList = {{1, 0}, {-1, 0}, {0, -1}, {0, 1}}; // 상 하 좌 우

  for(int i = 1; i <= N; i++) {
    string input;

    cin >> input;

    int j = 1;
    for(char temp : input) {
      map[i][j] = temp - '0';
      j++;
    }
  }

  visited[0][1][1] = true;
  q.push({{1, 1}, {false, 1}});

  while(q.size()) {
    int curY = q.front().first.first;
    int curX = q.front().first.second;
    bool isBreak = q.front().second.first;
    int time = q.front().second.second;
    q.pop();

    // 종료 조건
      if(curY == N && curX == M) {
        cout << time;
        return 0;
      }

    for(int i = 0; i < 4; i++) {
      int newY = curY + dirList[i].first;
      int newX = curX + dirList[i].second;
      bool breaking = isBreak;

      // 종료 조건
      if(newY == N && newX == M) {
        cout << time + 1;
        return 0;
      }

      // 예외처리 (범위 밖으로 나갔을 경우)
      if(newY < 1 || newX < 1 || newY > N || newX > M) continue;

      // 이미 방문한 경우
      if(breaking) {
        if(visited[1][newY][newX]) continue;
      } else {
        if(visited[0][newY][newX]) continue;
      }

      // 벽을 만났을 경우
      if(map[newY][newX] == 1) {
        // 벽을 부술 수 있는 경우
        if(!breaking) {
          breaking = true;
        } else {
          continue;
        }
      }
      
      // 방문 처리
      if(breaking) {
        visited[1][newY][newX] = true;
      } else {
        visited[0][newY][newX] = true;
      }

      // 방문
      q.push({{newY, newX}, {breaking, time + 1}});
    }
  }

  cout << -1;

  // print
  // cout << "------" << '\n';
  // for(int i = 1; i <= N; i++) {
  //   for(int j = 1; j <= M; j++) {
  //     cout << visited[0][i][j] << ' ';
  //   }
  //   cout << '\n';
  // }

  return 0;
}