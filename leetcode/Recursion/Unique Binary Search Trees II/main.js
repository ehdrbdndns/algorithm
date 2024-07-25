/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function (n) {
  const nodes = [];
  for (let i = 1; i <= n; i++) {
    nodes.push(i);
  }

  return makeBST(nodes);
};

function makeBST(nodes) {
  if (nodes.length === 0) {
    return null;
  }

  if (nodes.length === 1) {
    return [new TreeNode(nodes[0])];
  }

  const result = [];

  for (let i = 0; i < nodes.length; i++) {
    const rightSubTrees = makeBST(nodes.slice(i + 1));
    const leftSubTrees = makeBST(nodes.slice(0, i));

    if (!rightSubTrees) {
      leftSubTrees.forEach((tree) => {
        result.push(new TreeNode(nodes[i], tree, null));
      })
    } else if (!leftSubTrees) {
      rightSubTrees.forEach((tree) => {
        result.push(new TreeNode(nodes[i], null, tree))
      })
    } else {
      leftSubTrees.forEach((leftTree) => {
        rightSubTrees.forEach((rightTree) => {
          result.push(new TreeNode(nodes[i], leftTree, rightTree));
        })
      })
    }
  }

  return result;
}