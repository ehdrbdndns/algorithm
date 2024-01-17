#include <iostream>
#include <vector>

using namespace std;
#define MAX 100001

int arr[MAX];
bool visited[MAX];
vector<int> v[MAX];
int N;

void dfs(int k) {
  visited[k] = true;
  for(int i = 0; i < v[k].size(); i++) {
    int next = v[k][i];
    if(!visited[next]) {
      arr[next] = k;
      dfs(next);
    }
  }
}

int main() {
  cin >> N;
  for(int i = 1; i < N; i++) {
    int x, y;
    cin >> x >> y;
    v[x].push_back(y);
    v[y].push_back(x);
  }

  dfs(1);

  for(int i = 2; i <= N; i++) {
    cout << arr[i] << endl;
  }

  return 0;
}