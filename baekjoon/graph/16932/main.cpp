#include <iostream>
#include <vector>
#include <queue>
#include <set>

using namespace std;

int main() {
  // 사각형 모양의 칸이 주어질 때 1끼리 인접한 개수 중 가장 큰 수를 구하는 문제
  // 단 0 중 하나만 1로 변경할 수 있음, 따라서 1로 변경했을 때의 가장 큰 수를 구하는 문제임
  // 1을 기준으로 bfs를 돌면서...
  // 0을 기준으로 bfs를 돌아야하나..?
  // 총 크기는 100만이니.. 시간 복잡도가 N^2이 되면 무조건 시간 초과가 뜨니 조심
  
  // 해결방법
  // 1. 미리 사전에 1을 기준으로 bfs를 돌면서 주변 cell 개수를 파악해 저장
  // 2. 0을 기준으로 상하좌우를 탐색해 미리 저장된 cell 개수를 더해주자
  // 시간 복잡도: 0(N) + bfs(시간 복잡도)

  int N, M;

  cin >> N >> M;

  // 지도
  vector<vector<int>> map(N, vector<int>(M));
  // 방문 테이블
  vector<vector<bool>> visited(N, vector<bool>(M));
  // 주변 셀 개수
  vector<vector<vector<int>>> countMap(2, vector<vector<int>>(N, vector<int>(M, 0))); // 0은 주변 셀 개수, 1은 렌드마크..ㅋㅋ
  // bfs에 사용할 q
  queue<pair<int, int>> q;

  vector<pair<int, int>> dirList = {{1, 0}, {-1, 0}, {0, -1}, {0, 1}}; // 상하좌우

  for(int i = 0; i < N; i++) {
    for(int j = 0; j < M; j++) {
      int input;
      cin >> input;

      map[i][j] = input;
    }
  }

  int landMark = 1; // cell의 렌드마크를 세울 때 사용하는 마크
  for(int i = 0; i < N; i++) {
    for(int j = 0; j < M; j++) {
      // 1이고 방문되지 않은 cell을 bfs 함
      if(map[i][j] == 1 && !visited[i][j]) {
        q.push({i, j});
        int cellCount = 1;
        visited[i][j] = true;
        vector<pair<int, int>> cellList = {{i, j}};

        // bfs
        while(q.size()) {
          int curY = q.front().first;
          int curX = q.front().second;
          q.pop();

          for(int i = 0; i < 4; i++) {
            int newY = curY + dirList[i].first;
            int newX = curX + dirList[i].second;

            // 예외 처리
            if(newY < 0 || newX < 0 || newY >= N || newX >= M) continue;

            if(map[newY][newX] == 0) continue;

            if(visited[newY][newX]) continue;

            visited[newY][newX] = true;
            cellCount += 1;
            cellList.push_back({newY, newX});
            q.push({newY, newX});
          }
        }

        // 주변 셀 개수 기록 및 마크 세우기
        for(int i = 0; i < cellList.size(); i++) {
          int curY = cellList[i].first;
          int curX = cellList[i].second;

          countMap[0][curY][curX] = cellCount;
          countMap[1][curY][curX] = landMark;
        }

        landMark++;
      }
    }
  }

  // print
  // cout << "----" << '\n';
  // for(int i = 0; i < N; i++) {
  //   for(int j = 0; j < M; j++) {
  //     cout << countMap[1][i][j] << " ";
  //   }
  //   cout << "\n";
  // }

  // 0을 기준으로 상하좌우 탐색해 가장 큰 셀의 개수 구하기
  int result = 0;
  for(int i = 0; i < N; i++) {
    for(int j = 0; j < M; j++) {
      if(map[i][j] == 0) {
        int curCellCount = 1;
        set<int> setForLandMark;
        for(int k = 0; k < 4; k++) {
          int newY = i + dirList[k].first;
          int newX = j + dirList[k].second;

          // 예외 처리
          if(newY < 0 || newX < 0 || newY >= N || newX >= M) continue;

          // 이미 방문했던 셀인지
          if(setForLandMark.find(countMap[1][newY][newX]) != setForLandMark.end()) continue;

          curCellCount += countMap[0][newY][newX];
          setForLandMark.insert(countMap[1][newY][newX]);
        }

        if(result < curCellCount) {
          result = curCellCount;
        }
      }
    }
  }

  cout << result;

  return 0;
}