#include <iostream>

using namespace std;

const int kMaxStr = 100;

bool IsEqual(const char str1[], const char str2[]) {
  int isEqual = true;
  int curCount = 0;
  while(true) {
    if(str1[curCount] != str2[curCount]) {
      isEqual = false;
      break;
    }

    if(str1[curCount] == '\0') break;

    curCount++;
  }

  return isEqual;
}

int main() {

  const char str1[kMaxStr] = "stop";

  while(1) {
    char newStr[kMaxStr];
    cin >> newStr;

    if(IsEqual(str1, newStr)) {
      cout << "종료합니다." << endl;
      break;
    } else {
      cout << "계속합니다." << endl;
    }
  }

  return 0;
}