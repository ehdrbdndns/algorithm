/**
 * @param {string} s
 * @return {number}
 */
var maxUniqueSplit = function(s) {
    let result = 0;
    let wordDict = new Set();

    const getMaxNumOfUniqSubs = (subs) => {
        // base case
        if(subs.length === 0) {
            result = result < wordDict.size ? wordDict.size : result;
            return;
        }

        let words = '';

        for(let i = 0; i < subs.length; i++) {
            words += subs[i];

            if(!wordDict.has(words)) {
                wordDict.add(words);

                // recursive
                getMaxNumOfUniqSubs(subs.slice(i + 1));

                wordDict.delete(words);
            }
        }
    }

    getMaxNumOfUniqSubs(s);

    return result;
};