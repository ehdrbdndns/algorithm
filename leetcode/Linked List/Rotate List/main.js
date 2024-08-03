/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function (head, k) {
  if (!head) {
    return head;
  }

  let node = head;

  // get length
  let total = 0;
  let stack = [];
  while (!!node) {
    total++;
    stack.push(node);
    node = node.next;
  }

  // get rotate count
  // total % k
  const rotateCount = k % total;

  if (rotateCount === 0) {
    return head;
  }

  const tail = stack[stack.length - 1];
  tail.next = head;

  newHead = stack[stack.length - rotateCount];
  prevNewHead = stack[stack.length - rotateCount - 1];
  prevNewHead.next = null;

  return newHead;
};