const hash = new Array(31).fill(null);
hash[0] = 0;
hash[1] = 1;

/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
  if (hash[n]) {
    return hash[n];
  }

  if (n < 2) {
    hash[n] = n;
    return n;
  }

  hash[n] = fib(n - 1) + fib(n - 2);

  return hash[n];
};