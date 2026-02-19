/**
 * @param {string} s
 * @return {number}
 */
var countBinarySubstrings = function(s) {
    let sequences = []

    let sequenceCount = 1
    for(let i = 1; i < s.length; i++) {
        if(s[i] === s[i - 1]) {
            sequenceCount++
        } else {
            sequences.push(sequenceCount)
            sequenceCount = 1
        }
    }

    sequences.push(sequenceCount)

    let result = 0
    for(let i = 0; i < sequences.length - 1; i++) {
        result += Math.min(sequences[i], sequences[i + 1])
    }

    return result
};