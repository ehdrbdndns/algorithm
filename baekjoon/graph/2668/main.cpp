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

  vector<int> stack; // root
  for(int i = 1; i <= N; i++) {
    vector<int> visited(N + 1, false);

    if(i == list[i]) {
      result.push_back(i);
      continue;
    }

    stack.push_back(i);

    while(stack.size()) {
      int parent = stack.back();
      stack.pop_back();

      visited[parent] = true;

      if(i == list[parent]) {
        result.push_back(i);
        break;
      }
      
      if(visited[list[parent]]) break;

      stack.push_back(list[parent]);
    }    
  }

  cout << result.size() << '\n';

  for(int i = 0; i < result.size(); i++) {
    cout << result[i] << '\n';
  }

  return 0;
}