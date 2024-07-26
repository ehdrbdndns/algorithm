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
var oddEvenList = function (head) {
  // check edge case
  if (!head || !head.next || !head.next.next) {
    return head;
  }

  let odd = head;
  let even = head.next;
  let nextOdd = even.next;

  while (true) {
    if (!nextOdd) {
      break;
    }

    const temp = odd.next;
    odd.next = nextOdd;
    even.next = nextOdd.next;
    nextOdd.next = temp;

    odd = nextOdd;
    even = even?.next || null;
    nextOdd = even?.next || null;
  }

  return head;
};