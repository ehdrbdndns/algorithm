#include <iostream>

using namespace std;

const int kMaxStr = 100;

int Min(int a, int b) {
  return a < b ? a : b;
}

int main() {

  char str1[] = "Heelo, World!";
  char str2[kMaxStr];

  memcpy(str2, str1, Min(sizeof(str1), sizeof(str2)));
  cout << str2 << endl;

  // new로 할방닫은 동적 메모리는 항상 delete 해줘야 한다.
  char *dynamic_array = new char[kMaxStr];

  memcpy(dynamic_array, str1, kMaxStr);
  cout << dynamic_array << endl;

  cout << str1 << " " << str2 << " " << dynamic_array << endl;
  cout << size_t(str1) << " " << size_t(str2) << " " << size_t(dynamic_array) << endl;

  delete[] dynamic_array;

  return 0;
}