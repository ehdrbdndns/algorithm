/**
 * @param {number} n
 * @return {number}
 */
var binaryGap = function(n) {
    let binary = n.toString(2)

    let result = 0
    let distance = 0
    let stack = 0
    for(let v of binary) {
        if(v === "1") {
            if(stack === 0) {
                stack++
            } else {
                result = Math.max(result, distance)
                distance = 0
            }
        }

        distance++
    }

    return result
};