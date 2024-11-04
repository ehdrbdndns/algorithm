/**
 * @param {string} word
 * @return {string}
 */
var compressedString = function(word) {
    let comp = '';

    let count = 0;
    let prefix = '';
    for(let c of word) {
        if(c === prefix && count < 9) {
            count++;
        } else {
            if(prefix !== '') {
                comp += count + prefix;
            }

            prefix = c;
            count = 1;
        }
    }

    comp += count + prefix;

    return comp
};