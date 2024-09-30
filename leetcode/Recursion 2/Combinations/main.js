let N = 0;
let K = 0;

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  const result = [];

  K = k;
  N = n;
  set = new Set();

  backtrace(1, [], 0, result);

  return result;
};

const backtrace = (num, values, depth, result) => {
  if (depth === K) {
    result.push([...values]);
    return;
  }

  for (let i = num; i <= N; i++) {
    values.push(i);

    backtrace(i + 1, values, depth + 1, result);

    values.pop();
  }
}