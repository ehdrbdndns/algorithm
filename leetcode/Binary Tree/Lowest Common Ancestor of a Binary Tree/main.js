/**
 * @param {TreeNode} node
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @param {number} depth
 * @return {object}
 */
function dfs(node, p, q, isFind) {
  let isTarget = false;

  // break statement
  if (node === p || node === q) {
    isTarget = true;

    if (isFind) {
      return { isTarget: true, lowest: null }
    }
  }

  // left
  const left = node?.left
    ? dfs(node.left, p, q, isTarget || isFind)
    : { lowest: null, isTarget: false }

  // right
  const right = node?.right
    ? dfs(node.right, p, q, isTarget || isFind)
    : { lowest: null, isTarget: false }

  // lowest
  let lowest = null;
  if (left.lowest || right.lowest) {
    lowest = left.lowest ? left.lowest : right.lowest
  } else if (left.isTarget && right.isTarget) {
    lowest = node;
  } else if ((left.isTarget || right.isTarget) && isTarget) {
    lowest = node;
  }

  // return {isTarget, lowest}
  return { isTarget: isTarget || right.isTarget || left.isTarget, lowest }
}

/**
* Definition for a binary tree node.
* function TreeNode(val) {
*     this.val = val;
*     this.left = this.right = null;
* }
*/
/**
* @param {TreeNode} root
* @param {TreeNode} p
* @param {TreeNode} q
* @return {TreeNode}
*/
var lowestCommonAncestor = function (root, p, q) {
  const result = dfs(root, p, q, false);
  return result.lowest;
};