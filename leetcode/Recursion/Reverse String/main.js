/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
  const halfSize = Math.floor(s.length / 2);
  for (let i = 0; i < halfSize; i++) {
    const temp = s[s.length - i - 1];
    s[s.length - i - 1] = s[i];
    s[i] = temp;
  }
};