/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const map = new Map();

  for (let i = 0; i < strs.length; i++) {
    const calculatedKey = strs[i].split('').sort().join('');
    if (!map.has(calculatedKey)) {
      map.set(calculatedKey, []);
    }

    const existValue = map.get(calculatedKey);
    existValue.push(strs[i]);
    map.set(calculatedKey, existValue);
  }

  return [...map.values()]
};