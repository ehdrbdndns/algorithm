#include <iostream>

using namespace std;

int main() {

  int enterCount = 1;
  int curCount = 1;
  for(int i = 1; i <= 15; i++) {
    cout << i << " ";    
    if(curCount == enterCount) {
      curCount = 0;
      enterCount++;
      cout << endl;
    }

    curCount++;
  }

  return 0;
}