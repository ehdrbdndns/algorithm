/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var kthGrammar = function (n, k) {
  return getKthGrammer(n, k, 0);
};

function getKthGrammer(n, k, node) {
  // base case
  if (n < 2) {
    return node;
  }

  const totalLength = Math.pow(2, n - 1);

  let newN;
  let newK;
  let newNode;
  if ((totalLength / 2) < k) {
    // right
    newN = n - 1;
    newK = k - (totalLength / 2);
    newNode = node === 1 ? 0 : 1;
  } else {
    // left
    newN = n - 1;
    newK = k;
    newNode = node === 1 ? 1 : 0;
  }

  return getKthGrammer(newN, newK, newNode);
}