#include <iostream>

using namespace std;

int main() {

  char user_input[10001];

  cin >> user_input;

  int lastIndex = 0;
  while(user_input[lastIndex] != '\0') {
    lastIndex++;
  }

  bool isPalian = true;
  for(int i = 0; i < (lastIndex - 1) / 2; i++) {
    int j = lastIndex - 1 - i;

    if(user_input[i] != user_input[j]) {
      isPalian = false;
      break;
    }
  } 

  cout << isPalian << endl;

  return 0;
}