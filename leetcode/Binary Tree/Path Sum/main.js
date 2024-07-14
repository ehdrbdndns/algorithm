/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
  if (!root) {
    return false;
  }

  return preOrder(root, targetSum, 0)
};

function preOrder(node, targetSum, sumOfNode) {
  // check leaf
  if (!node.left && !node.right) {
    return targetSum === (sumOfNode + node.val);
  }

  const left = node.left
    ? preOrder(node.left, targetSum, sumOfNode + node.val)
    : false;

  const right = node.right
    ? preOrder(node.right, targetSum, sumOfNode + node.val)
    : false;

  return left || right;
}