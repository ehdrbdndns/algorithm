/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
  const indexOfC = new Map();
  const uniqueSet = new Set();

  for (let c of s) {
    uniqueSet.add(c);
  }

  for (let i = 0; i < s.length; i++) {
    if (!indexOfC.has(s[i])) {
      indexOfC.set(s[i], i);
    } else {
      uniqueSet.delete(s[i]);
    }
  }

  const indexOfResult = [...uniqueSet];

  if (!indexOfResult.length) {
    return -1;
  } else {
    return indexOfC.get(indexOfResult[0]);
  }
}; 