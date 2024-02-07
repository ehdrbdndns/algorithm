#include <iostream>
#include <vector>
#include <queue>

using namespace std;

int main() {
  // 치즈는 회색 부분
  // 치즈에는 하나 이상의 구멍이 있을 수 있다.
  // 치즈는 공기 중에 녹게 된다. -> 공기와 접촉시 한 시간 이후 녹음
  // 치즈 구멍 속에는 공기가 없지만 주변 치즈가 녹아서 구멍이 열리면 구멍 속으로 공기가 들어감
  // 치즈의 구멍은 'c'로 표기
  // 결론: 치즈가 모두 녹아 없어지는데 걸리는 시간, 마지막 치즈의 개수를 구해라
  // 조건: Y, X <= 100 / 치즈 없는 칸: 0, 있는 칸: 1

  // bfs로 돌면서 맨 끝 공기로부터 치즈를 찾음 -> 찾을 경우 해당 치즈는 따로 기록
  // 치츠의 개수가 0이 될때까지 반복 후 0이되면 기록한 치즈 개수와 반혹 횟수 반환

  int N, M; // y, x
  int cheeseCount = 0; // 총 치즈 개수
  int curCheeseCount; // 현재 치즈 개수
  int timeCount = 0; // 시간 타이머
  queue<pair<int, int>> q; // bfs에 사용될 q
  vector<pair<int, int>> dirList = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}}; // 상하좌우
  vector<pair<int, int>> cheeseWithAir; // 뚫린 치즈 위치
  cin >> N >> M;

  vector<vector<int>> map(N, vector<int>(M, 0));

  for(int i = 0; i < N; i++) {
    for(int j = 0; j < M; j++) {
      int input;
      cin >> input;
      map[i][j] = input;
      
      if(input == 1) {
        cheeseCount++;
      }
    }
  }

  while(cheeseCount != 0) {
    // 시간 측정
    timeCount++;

    // 방문 테이블
    vector<vector<bool>> visited(N, vector<bool>(M, false));
    
    // 탐색 위치 설정
    q.push({0, 0});

    // 삭제할 치즈 개수
    curCheeseCount = 0;

    while(q.size()) {
      auto position = q.front();
      q.pop();

      // 방문처리
      visited[position.first][position.second] = true;

      for(int i = 0; i < 4; i++) {
        int newY = dirList[i].first + position.first;
        int newX = dirList[i].second + position.second;

        // 범위 체크
        if(newY < 0 || newX < 0 || newY >= N || newX >= M) continue;
        
        // 방문 여부 체크
        if(visited[newY][newX]) continue;

        // 치즈인 경우 공기로 변경 후 탐색 중지
        if(map[newY][newX] == 1) {
          map[newY][newX] = 0;
          curCheeseCount++;
          cheeseCount--;
        } else {
          q.push({newY, newX});
        }
        visited[newY][newX] = true;
      }
    }

    // cout << "-----" << '\n';
    //       for(int i = 0; i < N; i++) {
    //         for(int j = 0; j < M; j++) {
    //           cout << map[i][j] << " ";
    //         }
    //         cout << '\n';
    //       }
    //       cout << "-----" << '\n';
  }

  cout << timeCount << '\n';
  cout << curCheeseCount;

  return 0;
}