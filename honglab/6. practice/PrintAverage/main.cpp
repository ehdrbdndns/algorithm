#include <iostream>

using namespace std;

int main() {

  int scores[] = {20, 40, 80, 60, 99};
  float sum = 0.0f;
  for(int i = 0; i < sizeof(scores)/sizeof(int); i++) {
    sum += scores[i];
  }

  cout << sum / (sizeof(scores)/sizeof(int)) << endl;

  return 0;
}