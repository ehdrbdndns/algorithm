#include <iostream>

using namespace std;

int Add(int a, int b) {
  return a + b;
}

void Add(int a, int b, int *c) {
  *c = a + b;
}

int main() {

  cout << Add(1, 2) << endl;

  int sum;
  Add(4, 5, &sum);

  cout << sum << endl;

  return 0;
}