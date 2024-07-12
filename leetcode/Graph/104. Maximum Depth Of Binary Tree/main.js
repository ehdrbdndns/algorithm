/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

function getDetpth(node, depth) {
  if (!node) {
    return depth - 1;
  }

  // left
  const left = getDetpth(node.left, depth + 1);

  // right
  const right = getDetpth(node.right, depth + 1);

  return Math.max(left, right);
}

/**
* @param {TreeNode} root
* @return {number}
*/
var maxDepth = function (root) {
  if (!root) {
    return 0;
  }

  return getDetpth(root, 1);
};