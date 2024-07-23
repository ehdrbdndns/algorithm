const hash = new Array(46).fill(null);
hash[0] = 1;

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  if (hash[n]) {
    return hash[n];
  }

  if (n === 0) {
    return 1;
  }

  if (n < 0) {
    return 0;
  }

  hash[n] = climbStairs(n - 1) + climbStairs(n - 2);
  return hash[n];
};