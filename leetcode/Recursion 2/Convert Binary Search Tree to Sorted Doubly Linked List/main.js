/**
 * // Definition for a _Node.
 * function _Node(val, left, right) {
 *      this.val = val;
 *      this.left = left;
 *      this.right = right;
 *  };
 */

/**
 * @param {_Node} root
 * @return {_Node}
 */
var treeToDoublyList = function (root) {
  const sortedList = recursive(root);

  if (sortedList.length > 0) {
    sortedList[0].left = sortedList[sortedList.length - 1];
    sortedList[sortedList.length - 1].right = sortedList[0]
  }

  return sortedList[0];
};

const recursive = (node) => {
  if (node === null) {
    return [];
  }

  if (!node.left && !node.right) {
    return [node];
  }

  let left = [];
  if (node.left !== null) {
    left = recursive(node.left);
    left[left.length - 1].right = node;
    node.left = left[left.length - 1];
  }

  let right = [];
  if (node.right !== null) {
    right = recursive(node.right);
    right[0].left = node;
    node.right = right[0];
  }

  return [...left, node, ...right]
}