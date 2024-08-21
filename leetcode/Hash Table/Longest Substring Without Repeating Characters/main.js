/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let startIndex = 0;
  let endIndex = 0;
  let result = 1;
  const map = new Map();

  for (let i = 0; i < s.length; i++) {
    const c = s[i];

    if (map.has(c)) {
      endIndex = map.get(c);
      const newLength = endIndex - startIndex - 1;
      if (result < newLength) {
        result = newLength;
      }

      // map 초기화 필요
      // endIndex 전에 있는 것들의 정보를 map에서 삭제 필요
      for (let j = startIndex; j < endIndex; j++) {
        map.delete(s[j])
      }
      startIndex = endIndex
    }

    map.set(c, i);
  }

  return result;
};