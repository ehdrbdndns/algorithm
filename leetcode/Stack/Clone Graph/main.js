/**
 * // Definition for a _Node.
 * function _Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {_Node} node
 * @param {_Node} clone
 * @return {_Node}
 */
const dfs = (node, clone, visited) => {
  if (visited[node.val]) {
    return;
  }

  visited[node.val] = true;

  for (let n of node.neighbors) {
    if (!clone[n.val]) {
      clone[n.val] = new _Node(n.val);
    }

    clone[node.val].neighbors.push(clone[n.val]);

    dfs(n, clone, visited);
  }
}

/**
* @param {_Node} node
* @return {_Node}
*/
var cloneGraph = function (node) {
  if (node === null) {
    return node;
  }

  const visited = new Array(102).fill(false);
  const clone = {};

  clone[node.val] = new _Node(node.val, []);

  dfs(node, clone, visited);

  return clone[1];
};