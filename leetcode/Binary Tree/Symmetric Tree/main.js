/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

function postOrder(node) {
  if (node === null) {
    return [null];
  }

  const left = postOrder(node.left);
  const right = postOrder(node.right);
  return [node.val, ...left, ...right]
}

function reversedPostOrder(node) {
  if (!node) {
    return [null]
  }
  const right = reversedPostOrder(node.right);
  const left = reversedPostOrder(node.left);

  return [node.val, ...right, ...left];
}

/**
* @param {TreeNode} root
* @return {boolean}
*/
var isSymmetric = function (root) {
  const left = postOrder(root.left);
  const right = reversedPostOrder(root.right);

  if (left.length !== right.length) {
    return false;
  }

  for (let i = 0; i < left.length; i++) {
    if (left[i] !== right[i]) {
      return false;
    }
  }

  return true;
};