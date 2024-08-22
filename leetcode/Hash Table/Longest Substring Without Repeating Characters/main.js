/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  const map = new Map();
  let startIndex = 0;
  let longestLength = 0;

  for (let i = 0; i < s.length; i++) {
    const c = s[i];

    if (map.has(c) && map.get(c) >= startIndex) {
      const length = i - startIndex;
      longestLength = longestLength < length ? length : longestLength;

      const duplicatedIndex = map.get(c);

      startIndex = duplicatedIndex + 1;
    }

    map.set(c, i);
  }

  const length = s.length - startIndex;
  longestLength = longestLength < length ? length : longestLength;

  return longestLength;
}; 