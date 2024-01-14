#include <iostream>

using namespace std;

int main() {
  
  char user_input[100];

  cout << "원하는 문장을 입력해주세요." << endl;
  cout << "입력: ";

  // cin >> user_input;

  // cin.getline(user_input, sizeof(user_input));


  // cout << "메아리: " << user_input << endl;
  // int number = -1;
  // int number2 = -2;

  // cin >> number;
  // cin >> number2;

  // cout << number << " " << number2 << endl;
  
  int number = -1;

  cin.getline(user_input, sizeof(user_input));

  // 최대 100글짜 까지 입력 받아서 무시하겠다. 또는 \n이 있으면 그때부터 무시하겠따.
  // cin.ignore(numeric_limits<streamsize>::max(), '\n') -> streamsize의 최대치를 전부 무시하겠다는 뜻
  cin.ignore(100, '\n');

  cin >> number;

  cout << user_input << " " << number << endl;

  return 0;
}