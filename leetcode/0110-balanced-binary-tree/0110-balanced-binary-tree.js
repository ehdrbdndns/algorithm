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
var isBalanced = function(root) {
    return dfsHeight(root) !== -1
};

function dfsHeight(tree) {
    if(!tree) {
        return 0
    }

    let left = dfsHeight(tree.left)
    if(left === -1) { return -1 }

    let right = dfsHeight(tree.right)
    if(right === -1) { return -1 }

    if(Math.abs(left - right) > 1) {
        return -1
    }

    return 1 + Math.max(left, right)
}