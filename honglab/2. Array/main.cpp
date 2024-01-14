#include <iostream>

using namespace std;

int main() {
  int a = 1;
  int b = 2;
  int c = 3;

  int my_array[3] = {1, 2, 3};

  cout << my_array[0] << " "
       << my_array[1] << " "
       << my_array[2] << " "
       << endl;

  char name[75] = "Hello, World";

  cout << name << " " << sizeof(name) << endl;

  return 0;
}