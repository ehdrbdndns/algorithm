#include <iostream>
#include <vector>
#include <queue>

using namespace std;

int main() {
  int R, C, N;
  cin >> R >> C >> N;

  vector<pair<int, int>> dirList = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}}; // 상, 하, 좌, 우
  vector<vector<int>> map = {{}};
  vector<pair<int, int>> boomIndexList;
  bool isFirst = true;
  for(int i = 1; i <= R; i++) {
    string input;
    cin >> input;
    vector<int> newMap = {0};
    int j = 1;
    for(char temp : input) {
      if(temp == 'O') {
        newMap.push_back(1);
        boomIndexList.push_back({i, j});
      } else {
        newMap.push_back(0);
      }
    }

    j++;
    map.push_back(newMap);
  }


  // for(int i = 1; i <= R; i++) {
  //   for(int j = 1; j <= C; j++) {
  //     cout << map[i][j];
  //   }
  //   cout << '\n';
  // }

  // count가 total Count와 같은 때까지 반복
  // count의 상태에 따라 map 구조 변경
  int newBoom = 1;
  for(int curCount = 0; curCount < N; curCount++) {
    // Count의 상태에 따라 분기점을 나눠야 함
    // 폭탄이 새로 생성되었을 때 그 친구는 카운트를 curCount로 재면 안댐
    // 2초부터 생성과 파괴가 번갈아 가면서 댐
    // cout << curCount << '\n';
    if(curCount == 0) continue;
    
    if(curCount % 2) {
      // 생성
      // 새로운 폭탄은 curCount로 표기
      newBoom++;
      for(int i = 1; i <= R; i++) {
        for(int j = 1; j <= C; j++) {
          if(map[i][j] != newBoom - 1) {
            map[i][j] = newBoom;
          }
        }
      }
    } else {
      // 파괴
      // 기존 폭탄의 값은 curCount보다 수가 작은 것을 활용해
      for(int i = 1; i <= R; i++) {
        for(int j = 1; j <= C; j++) {
          if(map[i][j] != newBoom && map[i][j] != 0) {
              queue<pair<int, int>> q; // Y, X
              q.push({i, j});
              while(q.size()) {
                auto curPosition = q.front();
                q.pop();

                map[curPosition.first][curPosition.second] = 0;

                for(int i = 0; i < dirList.size(); i++) {
                  auto dir = dirList[i];

                  int newY = dir.first + curPosition.first;
                  int newX = dir.second + curPosition.second;

                  if(newX < 1 || newY < 1 || newX > C || newY > R) continue;

                  if(map[newY][newX] == newBoom - 1) {
                    q.push({newY, newX});
                  }

                  map[newY][newX] = 0;
                }
            }  
          }
        }
      }
    }

  }

  for(int i = 1; i <= R; i++) {
    for(int j = 1; j <= C; j++) {
      if(map[i][j] != 0) {
        cout << 'O';
      } else {
        cout << '.';
      }
    }
    cout << '\n';
  }

  return 0;
}