/**
 * @param {number[]} node
 * @param {number} depth
 * @param {number} sum
 * @param {number} result
 * @param {number} target
 * @return {number}
 */
const dfs = (node, depth, sum, target) => {
  // check target
  if (node.length === depth) {
    if (sum === target) {
      return 1;
    } else {
      return 0;
    }
  }

  let result = 0;

  // '+'
  result += dfs(node, depth + 1, sum + node[depth], target);

  // '-'
  result += dfs(node, depth + 1, sum - node[depth], target);

  return result;
}

/**
* @param {number[]} nums
* @param {number} target
* @return {number}
*/
var findTargetSumWays = function (nums, target) {
  const result = dfs(nums, 0, 0, target);

  // return the number of different expressions
  return result;
};