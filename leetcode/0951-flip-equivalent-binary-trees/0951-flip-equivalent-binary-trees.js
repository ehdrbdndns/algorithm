/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var flipEquiv = function(root1, root2) {

    const hashMap = new Map();
    let stack = [{node: root1, parent: -1}];

    // make hash map
    while(stack.length) {
        const {node, parent} = stack.pop();

        if(!node) {
            continue;
        }

        if(node.right !== null && node.right !== undefined) {
            stack.push({node: node.right, parent: node.val})
        }

        if(node.left !== null && node.left !== undefined) {
            stack.push({node: node.left, parent: node.val})
        }

        hashMap.set(node.val, parent)
    }

    // check flip tree
    let result = true;
    let visitCount = 0;

    stack = [{node: root2, parent: -1}];
    while(stack.length) {
        const {node, parent} = stack.pop(); 

        if(!node) {
            continue;
        }

        if(node.right !== null && node.right !== undefined) {
            stack.push({node: node.right, parent: node.val})
        }

        if(node.left !== null && node.left !== undefined) {
            stack.push({node: node.left, parent: node.val})
        }

        if(hashMap.get(node.val) !== parent) {
            result = false;
            break;
        }

        visitCount++;
    }


    if(result) {
        result = visitCount === hashMap.size;
    }
    return result;
};