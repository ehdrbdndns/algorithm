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
 * @return {TreeNode[]}
 */
var findDuplicateSubtrees = function (root) {
  const subTreeSet = new Set();
  const duplicatedTreeMap = new Map();

  recursive(root, subTreeSet, duplicatedTreeMap);

  return [...duplicatedTreeMap.values()]
};

/**
* @param {TreeNode} root
* @param {Set} subTreeSet
* @param {Map} duplicatedTreeMap
* @return {String}
*/
function recursive(root, subTreeSet, duplicatedTreeMap) {
  if (root === null) {
    return ''
  }

  // get left
  const left = recursive(root.left, subTreeSet, duplicatedTreeMap)

  // get right
  const right = recursive(root.right, subTreeSet, duplicatedTreeMap)

  // calculate subkey
  const subKey = `${root.val}-${left}-${right}`

  // check duplicate
  if (subTreeSet.has(subKey)) {
    if (!duplicatedTreeMap.has(subKey)) {
      duplicatedTreeMap.set(subKey, root);
    }
  } else {
    subTreeSet.add(subKey);
  }

  return subKey;
}