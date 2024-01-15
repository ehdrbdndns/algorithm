#include <iostream>
#include <random>

using namespace std;

int main() {
  std::random_device rd;
  std::mt19937 gen(rd());
  std::uniform_int_distribution<> distrib(1, 99);

  int number = distrib(gen);

  int user_input;
  while(1) {
    cout << "입력: ";
    cin >> user_input;

    if(user_input > number){
      cout << "너무 커요" << endl;
    } else if(user_input < number) {
      cout << "너무 작아요!" << endl;
    } else {
      cout << "정답입니다.";
      break;
    }
  }

  return 0;
}

