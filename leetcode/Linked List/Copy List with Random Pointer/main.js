/**
 * // Definition for a _Node.
 * function _Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

let copiedStack = [];
/**
 * @param {_Node} head
 * @return {_Node}
 */
var copyRandomList = function (head) {
  copiedStack = [];
  const copiedHead = copy(head, 0);
  // console.log(copiedHead.next.random.val);
  return copiedHead;
};

function copy(node, depth) {
  // check base case
  if (!node) {
    return node;
  }

  // copy node
  const copied = new _Node(node.val, null, null);

  // push copied node to copiedStack
  copiedStack.push(copied);
  // set depth in origin list
  node.depth = depth;

  // travel
  const nextCopiedNode = copy(node.next, depth + 1);

  // set next
  copied.next = nextCopiedNode;

  // set randompoint
  const indexOfStack = node.random?.depth;

  if (indexOfStack !== null || indexOfStack !== undefined) {
    copied.random = copiedStack[indexOfStack];
  }

  return copied;
}