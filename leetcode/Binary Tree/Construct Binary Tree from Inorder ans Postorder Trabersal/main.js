/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
  if (!inorder || !inorder.length) {
    return null;
  }

  // create TreeNode
  const tree = new TreeNode();

  // get root, divide postorder
  const root = postorder.pop();
  tree.val = root;

  // find index of root in inorder
  const finedIndex = inorder.findIndex((value) => value === root);

  // get left order
  const leftInOrder = inorder.slice(0, finedIndex);

  // get right order
  const rightInOrder = inorder.slice(finedIndex + 1);

  // get right subTree
  const rightSubTree = buildTree(rightInOrder, postorder);
  tree.right = rightSubTree;

  // get left subTree
  const leftSubTree = buildTree(leftInOrder, postorder);
  tree.left = leftSubTree;

  // return bianry Tree
  return tree;
};

// inorder: left, root, right
// postorder: left, right, root