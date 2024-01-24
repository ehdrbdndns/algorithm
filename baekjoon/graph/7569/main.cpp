#include <iostream>
#include <queue>
#include <vector>

using namespace std;

struct Position
{
  int x;
  int y;
  int z;
};

int main()
{
  int M, N, H;

  cin >> M >> N >> H;

  int map[H + 1][N + 1][M + 1];
  vector<vector<int>> dirList = {{0, 0, 1}, {0, 0, -1}, {-1, 0, 0}, {1, 0, 0}, {0, 1, 0}, {0, -1, 0}}; // 위 아래 좌 우 앞 뒤(x, y, z);
  int tomatoCount = 0;
  queue<Position> q; // x, y, z

  for (int i = 1; i <= H; i++)
  {
    for (int j = 1; j <= N; j++)
    {
      for (int k = 1; k <= M; k++)
      {
        int input;
        cin >> input;
        map[i][j][k] = input;
        if (input == 0)
        {
          tomatoCount++;
        }
        else if (input == 1)
        {
          q.push({x : k, y : j, z : i});
        }
      }
    }
  }

  if (tomatoCount == 0)
  {
    cout << 0;
    return 0;
  }

  int result = 0;
  while (q.size())
  {
    auto curPosition = q.front();
    q.pop();

    for (int i = 0; i < dirList.size(); i++)
    {
      auto dir = dirList[i];
      int newX = curPosition.x + dir[0];
      int newY = curPosition.y + dir[1];
      int newZ = curPosition.z + dir[2];

      if (newX > M || newY > N || newZ > H || newX < 1 || newY < 1 || newZ < 1)
        continue;
      if (map[newZ][newY][newX] == -1 || map[newZ][newY][newX] != 0)
        continue;

      map[newZ][newY][newX] = map[curPosition.z][curPosition.y][curPosition.x] + 1;
      tomatoCount--;
      q.push({x : newX, y : newY, z : newZ});

      if (map[newZ][newY][newX] > result)
      {
        result = map[newZ][newY][newX];
      }
    }
  }

  if (tomatoCount != 0)
  {
    cout << -1;
  }
  else
  {
    cout << result - 1;
  }

  return 0;
}
