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
 * @param {number} k
 * @return {number}
 */
var kthLargestLevelSum = function(root, k) {
    const sumList = [];

    const stack = [];
    stack.push({node: root, level: 0});
    while(stack.length) {
        const {node, level} = stack.pop();

        if(!!node.right) {
            stack.push({node: node.right, level: level + 1});
        }

        if(!!node.left) {
            stack.push({node: node.left, level: level + 1});
        }

        if(sumList[level] === undefined) {
            sumList[level] = node.val;
        } else {
            sumList[level] += node.val;
        }
    }

    const sortedSumList = sumList.sort((a, b) => b- a);

    const result = sortedSumList[k - 1];

    return result === undefined ? -1 : result;
};