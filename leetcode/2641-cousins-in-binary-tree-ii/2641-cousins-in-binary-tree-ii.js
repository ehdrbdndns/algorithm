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
 * @return {TreeNode}
 */
var replaceValueInTree = function (root) {
    // [depth: number]: { [parent: number]: number }
    const cousinMap = new Map();
    let nodeId = 0;
    let stack = [{ node: root, depth: 0, parent: 0 }];

    while (stack.length) {
        const { node, depth, parent } = stack.pop();

        // set cousins
        if (cousinMap.has(depth)) {
            const existCousin = cousinMap.get(depth);

            if (existCousin.has(parent)) {
                existValue = existCousin.get(parent);
                existCousin.set(parent, existValue + node.val);
            } else {
                existCousin.set(parent, node.val);
            }

            // update totalCount
            existCousin.set('total', existCousin.get('total') + node.val);

            cousinMap.set(depth, existCousin);
            
        } else {
            const newCousin = new Map();
            newCousin.set(parent, node.val);
            newCousin.set('total', node.val);

            cousinMap.set(depth, newCousin);
        }

        // explore child node
        if (node.right !== null) {
            stack.push({ node: node.right, depth: depth + 1, parent: nodeId });
        }

        if (node.left !== null) {
            stack.push({ node: node.left, depth: depth + 1, parent: nodeId });
        }

        nodeId++;
    }

    // make new Tree;
    const newTree = root;

    nodeId = 0;
    stack = [{node: newTree, depth: 0, parent: 0}];
    while(stack.length) {
        const { node, depth, parent } = stack.pop();

        // copy
        if(depth === 0 || depth === 1) {
            node.val = 0;
        } else {
            node.val = cousinMap.get(depth).get('total') - cousinMap.get(depth).get(parent);
        }

        // explore child node
        if (node.right !== null) {
            stack.push({ node: node.right, depth: depth + 1, parent: nodeId });
        }

        if (node.left !== null) {
            stack.push({ node: node.left, depth: depth + 1, parent: nodeId });
        }

        nodeId++;
    }

    return newTree;
};