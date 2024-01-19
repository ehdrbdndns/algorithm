#include <iostream>
#include <vector>
#include <queue>

using namespace std;

#define MAX 102
int main() {
  int N, M;
  int map[MAX][MAX];
  vector<vector<int>> dirList = {{0, -1}, {0, 1}, {-1, 0}, {1, 0}}; // 상 하 좌 우

  cin >> N >> M;  

  for(int i = 1; i <= N; i++) {
    string input;
    cin >> input;
    
    int j = 1;
    for(char temp : input) {
      map[i][j++] = temp - '0';
    }
  }

  queue<pair<int, int>> q; // x, y
  q.push({1, 1});

  while(!q.empty() && map[N][M] == 1) {
    pair<int, int> node = q.front();
    q.pop();

    // 상 하 좌 우 확인
    for(int i = 0; i < dirList.size(); i++) {
      vector<int> dir = dirList[i];

      // 경로 이탈 확인
      int col = node.first + dir[0]; // 좌 우
      int row = node.second + dir[1]; // 상 하
      if(row < 1 || col < 1 || row > N || col > M) continue;
      if(map[row][col] != 1) continue; 
          // 고냥 진입
      // cout << "cur node: " << map[node.second][node.first] << '\n';
      // cout << "next node: " << map[row][col] << '\n';
      map[row][col] = map[node.second][node.first] + 1;
      // cout << "after node: " << map[row][col] << '\n';

      if(row == N && col == M) break;
    
      q.push({col, row});
    }
  }

  cout << map[N][M];

  return 0;
}