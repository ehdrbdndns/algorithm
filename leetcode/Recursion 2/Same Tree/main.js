/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  const stack = [];

  stack.push({ p, q });

  let result = true;
  while (stack.length) {
    const { p, q } = stack.pop();

    if (!p && !q) {
      continue;
    }

    if (!p || !q) {
      result = false;
      break;
    }

    if (p.val !== q.val) {
      result = false;
      break;
    }

    stack.push({ p: p.left, q: q.left });
    stack.push({ p: p.right, q: q.right });
  }

  return result;
};