#include <iostream>
#include <vector>
#include <math.h>

using namespace std;

int main() {

  int N;
  int findNumber;

  cin >> N;
  cin >> findNumber;
  
  // n^2 크기의 격자 판 생성
  vector<vector<int>> map(N, vector<int>(N, 0));

  int midIndex = ceil(N / 2);
  pair<int, int> curNode = {midIndex, midIndex};
  map[midIndex][midIndex] = 1;

  // 현재 방향 
  int curDir = 0; // 0: 상, 1: 우, 2: 하, 3: 좌
  // 현재 값
  int curValue = 1;
  // 찾고자 하는 값의 위치
  pair<int, int> indexOfFindNumber;
  while(curNode.first != 0 || curNode.second != 0) {
    if(curValue == findNumber) {
      indexOfFindNumber = curNode;
    }

    pair<int, int> nextNode = curNode;
    pair<int, int> checkNode = curNode;

    switch (curDir) {
    case 0:
      /* code */
      nextNode.first -= 1;
      checkNode = {curNode.first - 1, curNode.second + 1};
      break;
    case 1:
      nextNode.second += 1;
      checkNode = {curNode.first + 1, curNode.second + 1};
      break;
    case 2:
      nextNode.first += 1;
      checkNode = {curNode.first + 1, curNode.second - 1};
      break;
    case 3:
      nextNode.second -= 1;
      checkNode = {curNode.first - 1, curNode.second - 1};
      break;
    default:
      cout << "틀린 curDir 값입니다: " + curDir;
      break;
    }

    // 값 새기기
    map[nextNode.first][nextNode.second] = curValue + 1;
    curValue++;

    // 방향 전환 여부
    if(map[checkNode.first][checkNode.second] == 0) {
      curDir = (curDir + 1) % 4;
    }

    curNode = nextNode;

    if(curValue == findNumber) {
      indexOfFindNumber = curNode;
    }
  }

  // Print
  for(int i = 0; i < map.size(); i++) {
    for(int j = 0; j < map[0].size(); j++) {
      cout << map[i][j] << " ";
    }
    cout << '\n';
  }

  cout << indexOfFindNumber.first + 1 << " " << indexOfFindNumber.second + 1;

  return 0;
}