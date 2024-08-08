/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function (s, t) {
  const map = new Map();
  const set = new Set();

  for (let i = 0; i < s.length; i++) {
    const c = s[i];

    if (!map.has(c)) {
      if (set.has(t[i])) {
        return false;
      }

      map.set(c, t[i]);
      set.add(t[i])
    } else {
      if (map.get(c) !== t[i]) {
        return false;
      }
    }
  }

  return true;
};