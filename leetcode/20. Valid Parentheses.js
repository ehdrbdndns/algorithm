/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  let ret = true;
  const stack = [];
  const list = s.split('');
  for (let i = 0; i < list.length; i++) {
      if(!ret) break;
      
      const value = list[i];

      switch (value) {
          case '(':
          case '{':
          case '[':
              stack.push(value);
              break;
          case ')':
              if(stack.pop() !== '(') ret = false;
              break;
          case '}':
              if(stack.pop() !== '{') ret = false;
              break;
          case ']':
              if(stack.pop() !== '[') ret = false;
              break;
      }
  }
  if(stack.length > 0) ret = false;
  return ret
};