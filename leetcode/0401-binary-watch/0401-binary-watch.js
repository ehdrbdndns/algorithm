/**
 * @param {number} turnedOn
 * @return {string[]}
 */
var readBinaryWatch = function(turnedOn) {
    let popCount = (x) => {
        let cnt = 0

        while(x > 0) {
            x &= x - 1
            cnt++
        }

        return cnt
    }

    let res = []
    for(let h = 0; h <= 11; h++) {
        for(let m = 0; m <= 59; m++) {
            if(popCount(h) + popCount(m) === turnedOn) {
                res.push(`${h}:${String(m).padStart(2, '0')}`)
            }
        }
    }

    return res
};