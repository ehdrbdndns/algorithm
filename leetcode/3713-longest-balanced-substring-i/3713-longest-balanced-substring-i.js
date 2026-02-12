/**
 * @param {string} s
 * @return {number}
 */
var longestBalanced = function(s) {
    let res = 0

    for(let i = 0; i < s.length; i++) {
        let cnt = Array.from({length: 26}, () => 0)
        for(let j = i; j < s.length; j++) {
            let flag = true
            let indexOfCnt = s[j].charCodeAt(0) - 'a'.charCodeAt(0)
            cnt[indexOfCnt]++
            for(const x of cnt) {
                if(x > 0 && x !== cnt[indexOfCnt]) {
                    flag = false
                    break
                }
            }

            if(flag) {
                res = Math.max(res, j - i + 1)
            }
        }
    }

    return res
};