/**
 * // Definition for a _Node.
 * function _Node(val,prev,next,child) {
 *    this.val = val;
 *    this.prev = prev;
 *    this.next = next;
 *    this.child = child;
 * };
 */

/**
 * @param {_Node} head
 * @return {_Node}
 */
var flatten = function (head) {
  const node = head;

  flatStructure(node);

  return head;
};

function flatStructure(node) {
  let newNode = node;

  while (newNode) {
    if (newNode.child) {
      const temp = newNode.next;

      const childNodes = flatStructure(newNode.child, newNode.next);

      // link front
      newNode.next = newNode.child;
      newNode.next.prev = newNode;
      newNode.child = null;

      // link back
      childNodes.next = temp;
      if (childNodes.next && childNodes.next.prev) {
        childNodes.next.prev = childNodes;
      }

      continue;
    }

    if (!newNode.next) {
      break;
    }

    newNode = newNode.next;
  }

  return newNode;
}