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
  if (!root.left && !root.right) {
    return true;
  }

  let left = true;
  if (!!root.left) {
    left = divide(root, root.left, 'left');
  }

  let right = true;
  if (!!root.right) {
    right = divide(root, root.right, 'right');
  }

  return left && right;
};

function divide(parent, cur, pos) {
  // base case
  if (!cur) {
    return true;
  }

  if (!cur.left && !cur.right) {
    const isBST = (pos === 'left'
      ? parent.val > cur.val
      : parent.val < cur.val);
    return { isBST, min: cur.val, max: cur.val }
  }


  // left
  const left = divide(cur, cur.left, 'left');

  // right
  const right = divide(cur, cur.right, 'right');

  // conqure
  let isBST = (pos === 'left'
    ? parent.val > cur.val
    : parent.val < cur.val
  ) && left.isBST && left.max < cur.val
    && right.isBST && right.min > cur.val

  // combine
  return {
    isBST,
    min: left.min > right.min ? right.min : left.min,
    max: left.max > right.max ? left.max : right.max
  };
}