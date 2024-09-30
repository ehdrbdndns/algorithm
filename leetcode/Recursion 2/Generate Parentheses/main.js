/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  let result = [];
  let stack = [{ open: n, close: n, value: '' }];

  while (stack.length) {
    const { open, close, value } = stack.pop();

    if (open < 0 || close < 0) {
      continue;
    }

    if (!open && !close) {
      result.push(value);
      continue;
    }

    if (open > close) {
      continue;
    }

    stack.push({ open: open - 1, close, value: value + '(' });
    stack.push({ open, close: close - 1, value: value + ')' });
  }

  return result;
};