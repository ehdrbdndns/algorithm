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
 * @return {boolean}
 */
var isValidBST = function (root) {
  const result = divide_conquer(root);
  return result.isValid;
};

const divide_conquer = (node) => {
  // base case
  if (node === null) {
    return { isValid: true, min: null, max: null };
  }

  // divide left and right
  const left = node.left;
  const right = node.right;

  if (left !== null && left.val > node.val) {
    return { isValid: false, min: null, max: null };
  }
  if (right !== null && right.val < node.val) {
    return { isValid: false, min: null, max: null };
  }

  const leftNode = divide_conquer(node.left);
  const rightNode = divide_conquer(node.right);

  // check valid
  if (!leftNode.isValid || !rightNode.isValid) {
    return { isValid: false, min: null, max: null };
  }

  if (leftNode.max !== null && leftNode.max >= node.val) {
    return { isValid: false, min: null, max: null };
  }

  if (rightNode.min !== null && rightNode.min <= node.val) {
    return { isValid: false, min: null, max: null };
  }

  const isValid = true;
  let min = null;
  let max = null;

  if (leftNode.min === null) {
    min = node.val;
  } else {
    min = Math.min(node.val, leftNode.min)
  }

  if (rightNode.max === null) {
    max = node.val;
  } else {
    max = Math.max(node.val, rightNode.max)
  }

  // combine
  return { isValid, min, max };
}