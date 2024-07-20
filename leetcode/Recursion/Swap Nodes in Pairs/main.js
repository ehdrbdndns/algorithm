/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  if (!head) {
    return head;
  }

  const newHead = swap(head);

  return newHead
};

function swap(node) {
  if (!node) {
    return new ListNode();
  }

  let nextTarget = null;
  if (!!node.next && !!node.next.next) {
    nextTarget = swap(node.next.next);
  }

  // swap
  if (!!node.next) {
    const newHead = node.next;
    node.next = nextTarget;
    newHead.next = node;

    return newHead;
  } else {
    return node
  }
}