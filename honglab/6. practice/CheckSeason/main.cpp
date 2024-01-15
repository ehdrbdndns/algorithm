#include <iostream>

using namespace std;

int main() {

  int month;

  cin >> month;

  if(month >= 3 && month <=5) {
    cout << month << "월은 봄입니다.";
  } else if(month >= 6 && month <=8) {
    cout << month << "월은 여름입니다.";
  } else if(month >= 9 && month <= 11) {
    cout << month << "월은 가을입니다.";
  } else {
    cout << month << "월은 겨울입니다.";
  }

  return 0;
}