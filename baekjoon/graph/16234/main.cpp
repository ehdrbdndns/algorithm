#include <bits/stdc++.h>

using namespace std;

class UnionFind
{
private:
  vector<vector<pair<int, int>>> parents; // i, j
  vector<vector<int>> ranks;
  vector<vector<pair<int, int>>> parentsOfPeople; //[i][j] = {개수, 총 합}
  int _size;

public:
  UnionFind(int size)
  {
    _size = size;
    parents.resize(size);
    ranks.resize(size);
    parentsOfPeople.resize(size);
    for (int i = 0; i < size; i++)
    {
      for (int j = 0; j < size; j++)
      {
        parents[i].push_back({i, j});
        ranks[i].push_back(1);
        parentsOfPeople[i].push_back({0, 0});
      }
    }
  }
  pair<int, int> find(pair<int, int> position)
  {
    if (position == parents[position.first][position.second])
    {
      return position;
    }
    return parents[position.first][position.second] = find(parents[position.first][position.second]);
  }
  void unionSet(pair<int, int> x, pair<int, int> y)
  {
    auto parentX = find(x);
    auto parentY = find(y);
    if (parentX != parentY)
    {
      if (ranks[parentX.first][parentX.second] < ranks[parentY.first][parentY.second])
      {
        parents[parentX.first][parentX.second] = parentY;
      }
      else if (ranks[parentX.first][parentX.second] > ranks[parentY.first][parentY.second])
      {
        parents[parentY.first][parentY.second] = parentX;
      }
      else
      {
        parents[parentY.first][parentY.second] = parentX;
        ranks[parentX.first][parentX.second] += 1;
      }
    }
  }
  int findOfParentsValue(pair<int, int> position)
  {
    // <개수, 총 합개> 반환
    auto parent = find(position);
    return floor(parentsOfPeople[parent.first][parent.second].second / parentsOfPeople[parent.first][parent.second].first);
  }
  void reset()
  {
    parentsOfPeople.clear();
    parents.clear();
    ranks.clear();

    parentsOfPeople.resize(_size);
    parents.resize(_size);
    ranks.resize(_size);

    for (int i = 0; i < _size; i++)
    {
      for (int j = 0; j < _size; j++)
      {
        parents[i].push_back({i, j});
        ranks[i].push_back(1);
        parentsOfPeople[i].push_back({0, 0});
      }
    }
  }
  void setParentsValue(tuple<int, int, int> position)
  { // i, j, value
    auto parent = find({get<0>(position), get<1>(position)});
    parentsOfPeople[parent.first][parent.second].first += 1;
    parentsOfPeople[parent.first][parent.second].second += get<2>(position);
  }
};

int main()
{
  // L 이상 R 이하의 조건을 만족하는 국경선을 모두 찾는다.
  // 상하 좌우 각각 조건을 만족할 경우 Union Set을 해준다.
  // 인구 수를 재 조정한다.
  // 위 과정을 다시 반복한다.
  int N, L, R;
  cin >> N >> L >> R;

  UnionFind uf(N);
  vector<vector<int>> map(N + 1, vector<int>(N + 1));
  vector<vector<int>> dirList = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}}; // 상 하 좌 우

  for (int i = 0; i < N; i++)
  {
    for (int j = 0; j < N; j++)
    {
      int input;
      cin >> input;
      map[i][j] = input;
    }
  }

  int result = 0;
  bool isWalk = false;
  while (true)
  {
    for (int i = 0; i < N; i++)
    {
      for (int j = 0; j < N; j++)
      {
        for (int k = 0; k < dirList.size(); k++)
        {
          auto dir = dirList[k];
          int nextY = dir[0] + i;
          int nextX = dir[1] + j;

          if (nextY < 0 || nextX < 0 || nextX >= N || nextY >= N)
            continue;
          if (map[i][j] - map[nextY][nextX] < L || map[i][j] - map[nextY][nextX] > R)
            continue;

          uf.unionSet({i, j}, {nextY, nextX});
          isWalk = true;
        }
      }
    }

    if (!isWalk)
      break;

    result++;
    isWalk = false;

    // TODO 인구수 재조정
    for (int i = 0; i < N; i++)
    {
      for (int j = 0; j < N; j++)
      {
        uf.setParentsValue({i, j, map[i][j]});
      }
    }

    for (int i = 0; i < N; i++)
    {
      for (int j = 0; j < N; j++)
      {
        auto newValue = uf.findOfParentsValue({i, j});
        map[i][j] = newValue;
      }
    }

    uf.reset();
  }

  cout << result;

  return 0;
}