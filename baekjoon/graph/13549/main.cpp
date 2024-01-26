#include <iostream>
#include <vector>
#include <queue>

using namespace std;

#define MAX 100001

int main()
{
  int N, K;
  int minValue = 100001;
  int max = 0;
  cin >> N >> K;

  if (K == 0)
  {
    cout << N;
    return 0;
  }

  vector<int> map(MAX, 100001);
  map[N] = 0;

  queue<int> q;
  q.push(N);

  while (q.size())
  {
    int curPosition = q.front();
    q.pop();

    if(map[curPosition] > minValue) {
      continue;
    }

    if (curPosition > K) {
      // position이 target보다 작을 경우
      // 왼쪽 이동
      int nextPosition = curPosition - 1;
      if (nextPosition < 0) continue;
      if (map[curPosition] >= map[nextPosition]) continue;
      map[nextPosition] = map[curPosition] + 1;
      q.push(nextPosition);
    }
    else if (curPosition < K) {
      // position이 target보다 클 경우
      // 모든 이동 가능
      // 왼
      int nextPosition = curPosition - 1;
      if(nextPosition >= 0 && map[curPosition] < map[nextPosition]) {
        map[nextPosition] = map[curPosition] + 1;
        q.push(nextPosition); 
      };
      
      // 오
      nextPosition = curPosition + 1;
      if(nextPosition <= MAX && map[curPosition] < map[nextPosition]) {
        map[nextPosition] = map[curPosition] + 1;
        q.push(nextPosition);
      } 

      // 순간이동
      nextPosition = curPosition * 2;
      if(nextPosition <= MAX && map[curPosition] < map[nextPosition]) {
        map[nextPosition] = map[curPosition];
        q.push(nextPosition);
      } 
    } else {
      minValue = map[curPosition];
    }
  }

  cout << map[K];

  return 0;
}