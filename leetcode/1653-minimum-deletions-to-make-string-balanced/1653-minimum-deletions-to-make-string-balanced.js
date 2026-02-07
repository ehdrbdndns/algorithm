/**
 * @param {string} s
 * @return {number}
 */
var minimumDeletions = function(s) {
    let n = s.length
    let count_a = Array.from({length: s.length}, () => 0)
    let count_b = Array.from({length: s.length}, () => 0)

    let b_count = 0
    for(let i = 0; i < s.length; i++) {
        count_b[i] = b_count        
        if(s[i] === 'b') { b_count++ }
    }

    let a_count = 0
    for(let i = s.length - 1; i >=0; i--) {
        count_a[i] = a_count
        if(s[i] === 'a') { a_count++ }
    }

    let answer = s.length
    for(let i = 0; i < s.length; i++) {
        answer = Math.min(answer, count_b[i] + count_a[i])
    }

    return answer
};