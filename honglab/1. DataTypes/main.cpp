#include <iostream>

using namespace std;

int main() {
  int i;
  i = 123;

  cout << i << " " << sizeof(i) << endl;

  float f = 123.456f;
  double d = 123.456;

  cout << f << " " << sizeof(f) << endl;
  cout << d << " " << sizeof(d) << endl;

  char c = 'a';

  cout << c << " " << sizeof(c) << endl;

  char str[] = "Hello, World";

  cout << str << " " << sizeof(str) << endl;
}