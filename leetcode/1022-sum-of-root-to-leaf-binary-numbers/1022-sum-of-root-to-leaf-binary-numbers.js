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
 * @return {number}
 */
var sumRootToLeaf = function(root) {
    
    let binaries = getBinariesFromTree(root)

    let result = binaries.reduce((prev, cur) => {
        return prev + parseInt(cur, 2)
    }, 0)

    return result
};

function getBinariesFromTree(root) {
      // 종료 조건
    if(!root.left && !root.right) {
        console.log(root.val)
        return [root.val]
    }

    let binaries = []
    if(!!root.left) {
        binaries = getBinariesFromTree(root.left)
    }

    if(!!root.right) {
        binaries = [...binaries, ...getBinariesFromTree(root.right)]
    }

    return binaries.map((v) => {
        return `${root.val}${v}`
    })
}