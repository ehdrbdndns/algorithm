#include <iostream>

using namespace std;

int main() {

  int number;

  cin >> number;

  if(number % 2 == 0) cout << "짝수입니다.\n";
  else cout << "홀수입니다.\n";

  cout << (number % 2 == 0 ? "짝수입니다. \n" : "홀수입니다.\n");

  switch (number % 2)
  {
  case 0:
    cout << "0이야..\n";
    break;
  case 1:
    cout << "1이야..\n";
  default:
    break;
  }

  int second = number % 60;
  int minute = (number / 60) % 60;
  int hour = number / 3600;

  if(hour > 0) cout << hour << "시 ";
  if(minute > 0) cout << minute << "분 ";
  if(second > 0) cout << second << "초 ";
  // cout << hour << "시 " << minute << "분 " << second << "초" << endl;

  return 0;
}