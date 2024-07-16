/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {

  if (inorder.length === 0 || !inorder || !preorder) {
    return null;
  }

  const tree = new TreeNode();

  const root = preorder[0];
  preorder.shift();

  tree.val = root;

  const findedIndex = inorder.findIndex((num) => num === root)

  // left
  const leftOrder = inorder.slice(0, findedIndex);
  tree.left = buildTree(preorder, leftOrder);

  // right
  const rightOrder = inorder.slice(findedIndex + 1);
  tree.right = buildTree(preorder, rightOrder);

  return tree;
};