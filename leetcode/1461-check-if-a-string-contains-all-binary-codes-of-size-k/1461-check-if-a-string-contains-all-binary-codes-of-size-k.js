/**
 * @param {string} s
 * @param {number} k
 * @return {boolean}
 */
var hasAllCodes = function(s, k) {  
    
    if(s.length <= k) {
        return false
    }

    let set = new Set()
    let front = 0
    for(let rear = k; rear <= s.length; rear++) {
        // get substring
        let window = s.slice(front, rear)
        front++

        set.add(window)
    }

    console.log(set)

    return set.size === 2 ** k
};