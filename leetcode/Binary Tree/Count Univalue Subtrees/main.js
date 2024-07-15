/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

function postOrder(node) {
  // visit left
  const left = node.left
    ? postOrder(node.left)
    : { val: null, isUnionSub: true, count: 0 };

  // visit right
  const right = node.right
    ? postOrder(node.right)
    : { val: null, isUnionSub: true, count: 0 };

  // check leaf
  if (left.val === null && right.val === null) {
    return { val: node.val, isUnionSub: true, count: 1 }
  }

  // check union subtree
  let isUnionSub = left.isUnionSub && right.isUnionSub;
  if (isUnionSub) {
    if (!left.val) {
      isUnionSub = (right.val === node.val);
    } else if (!right) {
      isUnionSub = (left.val === node.val);
    } else {
      isUnionSub = (left.val === node.val && right.val === node.val)
    }
  }

  const subtreeCount = isUnionSub
    ? right.count + left.count + 1
    : right.count + left.count;

  // return { node.val, subtreeCount }
  return { val: node.val, isUnionSub, count: subtreeCount }
}

/**
* @param {TreeNode} root
* @return {number}
*/
var countUnivalSubtrees = function (root) {
  if (!root) {
    return 0;
  }

  const result = postOrder(root);

  return result.count;
};