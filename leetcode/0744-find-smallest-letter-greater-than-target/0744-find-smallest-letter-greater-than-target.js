/**
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */
var nextGreatestLetter = function(letters, target) {
    let set = new Set(letters)
    for(const letter of letters.values()) {
        if(target < letter) {
            return letter
        }
    }

    return letters[0]
};