const findStringInSquare = (s, startIndex) => {
  let result = '';
  let digit = '';

  let lastIndex = startIndex;

  for (let i = startIndex; i < s.length; i++) {
    // number
    if (!isNaN(s[i])) {
      digit += s[i];
      continue;
    }

    // '['
    if (s[i] === '[') {
      let { decodedString, lastIndex } = findStringInSquare(s, i + 1);
      for (let i = 0; i < Number(digit); i++) {
        result += decodedString;
      }
      digit = '';
      i = lastIndex;
      continue;
    }

    // ']'
    if (s[i] === ']') {
      lastIndex = i;
      break;
    }

    // string
    result += s[i];
  }

  // return result, lastIndex
  return { decodedString: result, lastIndex }
}

/**
* @param {string} s
* @return {string}
*/
var decodeString = function (s) {
  return result = findStringInSquare(s, 0).decodedString;
};