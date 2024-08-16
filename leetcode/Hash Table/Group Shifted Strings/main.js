/**
 * @param {string[]} strings
 * @return {string[][]}
 */
var groupStrings = function (strings) {
  const map = new Map();

  for (let i = 0; i < strings.length; i++) {
    const str = strings[i];

    let distance = 'a'.charCodeAt() - str[0].charCodeAt();
    let key = 'a';
    for (let i = 1; i < str.length; i++) {
      let asCode = str[i].charCodeAt() + distance;
      if (asCode > 122) {
        asCode = 97 + (asCode - 122)
      } else if (asCode < 97) {
        asCode = 122 - (96 - asCode)
      };

      key += String.fromCharCode(asCode);
    }

    if (map.has(key)) {
      map.get(key).push(str);
    } else {
      map.set(key, [str]);
    }
  }

  console.log(map)

  return [...map.values()];
};