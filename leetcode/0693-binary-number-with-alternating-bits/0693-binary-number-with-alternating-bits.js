/**
 * @param {number} n
 * @return {boolean}
 */
var hasAlternatingBits = function(n) {
    let res = true
    let bit = n.toString(2)
    // console.log(bit)
    let beforeOne = bit[0] === '1' ? true : false
    for(let i = 1; i < bit.length; i++) {
        if(beforeOne && bit[i] === '0') {
            beforeOne = false
        } else if(!beforeOne && bit[i] === '1') {
            beforeOne = true
        } else {
            res = false
            break
        }
    }

    return res
};