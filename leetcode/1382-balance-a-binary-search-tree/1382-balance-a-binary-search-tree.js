class CustomQueue {
    constructor() {
        this.array = []
        this.head = 0
    }

    push(v) {
        this.array.push(v)
    }

    pop() {
        if(this.size() === 0) { return }

        let answer = this.array[this.head]
        delete this.array[this.head++]
        return answer
    }
    
    size() {
        return this.array.length - this.head
    }
}

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
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

var balanceBST = function(root) {
    const nodes = [];

    function inorder(node) {
        if (!node) return;
        inorder(node.left);            // ⬅️ Left
        nodes.push(node.val);          // ⬆️ Root
        inorder(node.right);           // ➡️ Right
    }

    function build(start, end) {
        if (start > end) return null;
        const mid = Math.floor((start + end) / 2);
        const node = new TreeNode(nodes[mid]);        // ⬆️ Mid becomes root
        node.left = build(start, mid - 1);             // ⬅️ Build left
        node.right = build(mid + 1, end);              // ➡️ Build right
        return node;
    }

    inorder(root);
    return build(0, nodes.length - 1);
};