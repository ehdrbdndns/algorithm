/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
    let result = []
    let long = (a.length > b.length ? a : b).split('').map((v) => parseInt(v))
    let short = (a.length > b.length ? b : a).split('').map((v) => parseInt(v))

    long.reverse().map
    short.reverse()

    let isCarry = false
    for(let i = 0; i < long.length; i++) {
        let a = long[i]
        let b = short[i] ?? 0
        let c = isCarry ? 1 : 0
        
        let value = a + b + c
        
        if(value > 1) {
            isCarry = true
        } else {
            isCarry = false
        }

        result.push(value % 2)
    }

    if(isCarry) {
        result.push(1)
    }

    return result.reverse().reduce((a, b) => {
        return a + b
    }, "")
};