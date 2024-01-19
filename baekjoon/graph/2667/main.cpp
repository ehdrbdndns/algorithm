#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>

using namespace std;

#define MAX 26

vector<vector<int>> dirList = {{0, -1}, {0, 1}, {-1, 0}, {1, 0}};

struct node {
  int row;
  int col;
};

int main() {
  int N;
  cin >> N;
  int map[N + 1][N + 1];

  for(int i = 1; i <= N; i++) {
    string input;
    cin >> input;

    int j = 1;
    for(char tmp : input) {
      map[i][j++] = tmp - '0';
    }
  }

  int houseCount = 0;
  vector<int> result = {};
  for(int row = 1; row <= N; row++) {
    for(int col = 1; col <= N; col++) {
      if(map[row][col] == 1) {
        // bfs
        int curHouseCount = 1;
        queue<node> q;
        q.push({row: row, col: col});
        map[row][col] += houseCount + 1;

        while(!q.empty()) {
          node curNode = q.front();
          q.pop();

          for(int i = 0; i < dirList.size(); i++) {
            vector<int> dir = dirList[i];

            int nextCol = dir[0] + curNode.col;
            int nextRow = dir[1] + curNode.row;
            if(nextCol < 1 || nextRow < 1 || nextCol > N || nextRow > N) continue;
            if(map[nextRow][nextCol] != 1) continue;
            map[nextRow][nextCol] += houseCount + 1;
            curHouseCount++;
            q.push({row: nextRow, col: nextCol});
          }
        }

        result.push_back(curHouseCount);
        houseCount++;
      } 
    }
  }

  sort(result.begin(), result.end());

  cout << houseCount << '\n';
  for(int i = 0; i < result.size(); i++) {
    cout << result[i] << '\n';
  }

  return 0;
}