#include <iostream>
#include <vector>
#include <deque>
#include <tuple>

using namespace std;

int main() {
  int R, C;
  cin >> R >> C;

  deque<tuple<int, int, int>> dq; // position, time
  vector<pair<int, int>> dirList = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}}; // 상 하 좌 우
  vector<vector<char>> map(R, vector<char>(C));

  for(int i = 0; i < R; i++) {
    string input;
    cin >> input;
    int j = 0;
    for(char temp : input) {
      map[i][j] = temp;
      if(temp == 'J') {
        dq.push_front({i, j, 0});
      } else if(temp == 'F') {
        dq.push_back({i, j, 0});
      }
      j++;
    }
  }

  while(dq.size()) {
    auto info = dq.front();
    dq.pop_front();

    int curY = get<0>(info);
    int curX = get<1>(info);
    int time = get<2>(info);

    // 종료 조건
    if((curY == R - 1 || curX == C - 1 || curY == 0 || curX == 0) && map[curY][curX] == 'J') {
      cout << time + 1;
      return 0;
    }

    if(map[curY][curX] == 'F') {
      for(int i = 0; i < 4; i++) {
        int newY = dirList[i].first + curY;
        int newX = dirList[i].second + curX;

        // 범위 밖인지 확인
        if(newX < 0 || newY < 0 || newX >= C || newY >= R) continue;

        // 사람인지 갈 수 있는 통로인지 확인 
        if(map[newY][newX] == '#' || map[newY][newX] == 'F') continue;

        // dfs
        map[newY][newX] = 'F';
        dq.push_back(make_tuple(newY, newX, time + 1));
      }
    } else if(map[curY][curX] == 'J') {
      for(int i = 0; i < 4; i++) {
        int newY = dirList[i].first + curY;
        int newX = dirList[i].second + curX;

        // 범위 밖인지 확인
        if(newX < 0 || newY < 0 || newX >= C || newY >= R) continue;

        // 사람인지 갈 수 있는 통로인지 확인 
        if(map[newY][newX] != '.') continue;

        // dfs
        map[newY][newX] = 'J';
        dq.push_back(make_tuple(newY, newX, time + 1));
      }
    }


    // print
    // for(int i = 0; i < R; i++) {
    //   for(int j = 0; j < C; j++) {
    //     cout << map[i][j] << ' ';
    //   }
    //   cout << '\n';
    // }
  }

  cout << "IMPOSSIBLE";

  return 0;
}