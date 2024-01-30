#include <bits/stdc++.h>

using namespace std;

int main() {
  int N;

  cin >> N;

  vector<int> list(N + 1);
  vector<int> result;
  for(int i = 1; i <= N; i++) {
    int input;
    cin >> input;
    list[i] = input;
  }

  vector<pair<int, int>> stack; // prevParent, prevChild
  int root;
  int parentNode;
  for(int i = 1; i <= N; i++) {
    vector<int> visited(N + 1, false);
    stack.push_back({i, list[i]});
    root = i;
    while(stack.size()) {
      auto prevInfo = stack.back();
      stack.pop_back();
      
      if(visited[prevInfo.first] || visited[prevInfo.second]) continue;
      visited[prevInfo.first] = true;

      if(i == prevInfo.second) {
        result.push_back(i);
      } else {
        stack.push_back({prevInfo.second, list[prevInfo.second]});
      }
    }
  }

  sort(result.begin(), result.end());

  cout << result.size() << '\n';
  for(int i = 0; i < result.size(); i++) {
    cout << result[i] << '\n';
  }

  return 0;
}