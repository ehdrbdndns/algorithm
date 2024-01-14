#include <iostream>

using namespace std;

int main() {

  // for(int i = 0; i < 10; i++) {
  //   cout << i << " ";
  // }
  // cout << endl;

  //int my_array[] = {1, 2, 3, 4, 5, 6, 7, 6, 5, 4};
  // for(int i = 0; i < sizeof(my_array) / sizeof(int); i++) {
  //   cout << my_array[i] << " ";
  // }

  // char my_string[] = "Hello\0, World";
  // for(int i = 0; my_string[i] != '\0'; i++) {
  //   cout << my_string[i];
  // }

  // int i = 0;
  // while(i < 10) {
  //   cout << i << " ";
  //   i++;
  // }

  char my_string[] = "Hello\0, World";
  int i = 0;
  while(my_string[i] != '\0') {
    cout << my_string[i] << " ";
    i++;
  }

  return 0;
}