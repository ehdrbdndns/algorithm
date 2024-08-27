/**
 * @param {string[]} dictionary
 */
var ValidWordAbbr = function (dictionary) {
  this.dict = new Map();

  for (let word of dictionary) {
    const abbreviation = makeAbbreviation(word);

    if (this.dict.has(abbreviation)) {
      this.dict.get(abbreviation).add(word);
    } else {
      const set = new Set();
      set.add(word)
      this.dict.set(abbreviation, set);
    }
  }
};

/** 
* @param {string} word
* @return {boolean}
*/
ValidWordAbbr.prototype.isUnique = function (word) {
  const abbreviation = makeAbbreviation(word);

  // 중복 되는 것이 없으면 true
  if (this.dict.has(abbreviation)) {
    // 같은 단어가 아닐 경우 false 반환
    if (this.dict.get(abbreviation).size > 1 || !this.dict.get(abbreviation).has(word)) {
      return false;
    }
  }

  return true;
};

/** 
* Your ValidWordAbbr object will be instantiated and called as such:
* var obj = new ValidWordAbbr(dictionary)
* var param_1 = obj.isUnique(word)
*/

function makeAbbreviation(word) {
  const wordLength = word.length - 2;
  const abbreviation = wordLength > 0
    ? `${word[0]}${wordLength}${word[word.length - 1]}`
    : word;

  return abbreviation;
}  