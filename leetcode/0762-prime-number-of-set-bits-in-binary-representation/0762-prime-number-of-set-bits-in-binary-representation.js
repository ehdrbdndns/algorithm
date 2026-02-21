/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
var countPrimeSetBits = function(left, right) {
    let result = 0

    for(let i = left; i <= right; i++) {
        // get number of set bits
        let n = i
        let num = 0
        while(n > 0) {
            n = n & (n - 1)
            num++
        }

        // is prime
        if(isPrime(num)) {
            result++
        }
    }

    return result
};

function isPrime(n) {
    if(n < 2) return false

    for(let i = 2; i * i <= n; i++) {
        if(n % i === 0) {
            return false
        }
    }

    return true
}