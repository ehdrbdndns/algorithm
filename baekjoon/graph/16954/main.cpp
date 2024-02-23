#include <iostream>
#include <vector>
#include <queue>

using namespace std;

int main()
{
  // 벽이 매 초마다 아래로 한 칸 이동
  // 가장 아래로 내려가면 벽 삭제
  // 사람은 모든 칸에 한 칸씩 빈칸으로 이동 가능, 혹은 가만히 있기 가능..
  // 캐릭터가 먼저 이동 후 벽 이동, 이때 캐릭터랑 벽이랑 부딛치면 out
  // 결국 도달할 수 있느냐 없느냐가 포인트
  // 근데 방문 처리를 어케하지..? 7 * 7이라 안해도 되나>

  // 지도
  vector<vector<char>> map(8, vector<char>(8, '.'));

  // 벽 정보를 가지고 있는 리스트
  vector<pair<int, int>> wallList;
  // 사람 위치 정보를 가지고 있는 Q
  queue<pair<int, int>> personQ;

  // 사람이 이동할 수 있는 경우의 수
  vector<pair<int, int>> moveList = {
      {0, 0},   // 가만히
      {-1, 0},  // 상
      {-1, -1}, // 상좌
      {-1, 1},  // 상우
      {1, 0},   // 하
      {1, -1},  // 하좌
      {1, 1},   // 하우
      {0, -1},  // 좌
      {0, 1}    // 우
  };

  // Input
  for (int i = 0; i < 8; i++)
  {
    string input;
    cin >> input;

    int j = 0;
    for (char temp : input)
    {
      if (temp == '#')
      {
        map[i][j] = temp;
        wallList.push_back({i, j});
      }
      j++;
    }
  }

  // 사람 초기 위치
  personQ.push({7, 0});
  map[7][0] = 'P';

  while (personQ.size())
  {
    int personQSize = personQ.size();
    for (int i = 0; i < personQSize; i++)
    {
      int curY = personQ.front().first;
      int curX = personQ.front().second;
      personQ.pop();

      // 종료 조건
      if (curY == 0 && curX == 7)
      {
        cout << 1;
        return 0;
      }

      // 사람 이동
      // 대신 모든 사람이 이동해야 함

      for (int i = 0; i < moveList.size(); i++)
      {
        int newY = curY + moveList[i].first;
        int newX = curX + moveList[i].second;

        // 예외처리
        if (newY < 0 || newX < 0 || newY > 7 || newX > 7)
          continue;

        // 이동할 위치나 그 위에 벽이 있는지 확인
        if (map[newY][newX] == '#')
          continue;
        if (newY > 0 && map[newY - 1][newX] == '#')
          continue;

        // 종료 조건
        if (newY == 0 && newX == 7)
        {
          cout << 1;
          return 0;
        }

        // 이동..
        map[newY][newX] = 'P';
        personQ.push({newY, newX});
      }
    }
    // 기존 벽 지우기
    for (int i = 0; i < wallList.size(); i++)
    {
      int wallY = wallList[i].first;
      int wallX = wallList[i].second;

      map[wallY][wallX] = '.';
    }

    // 벽 이동
    for (int i = 0; i < wallList.size(); i++)
    {
      int wallY = wallList[i].first;
      int wallX = wallList[i].second;

      // 범위 밖으로 나간 것 처리
      if (wallY == 7)
        continue;

      map[wallY + 1][wallX] = '#';
      wallList[i] = {wallY + 1, wallX};
    }

    // cout << "---------------" << '\n';
    // for (int i = 0; i < 8; i++)
    // {
    //   for (int j = 0; j < 8; j++)
    //   {
    //     cout << map[i][j];
    //   }
    //   cout << '\n';
    // }
  }

  cout << 0;
  return 0;
}