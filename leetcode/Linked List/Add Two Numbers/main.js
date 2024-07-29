/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  const result = new ListNode();
  sumOfList(l1, l2, result, 0);
  return result;
};

function sumOfList(l1, l2, l3, digit) {

  if (!l1 && !l2) {
    if (digit > 0) {
      l3.val = digit;
      return;
    } else {
      return;
    }
  }

  // l3 = new ListNode();

  const l1Val = l1?.val || 0;
  const l2Val = l2?.val || 0;

  let newVal = l1Val + l2Val + digit;

  let isDigit = false;
  if (newVal > 9) {
    isDigit = true;
    newVal = newVal % 10;
  }

  l3.val = newVal;

  if (l1?.next || l2?.next || isDigit) {
    l3.next = new ListNode();
  }

  return sumOfList(l1?.next, l2?.next, l3.next, isDigit ? 1 : 0);
}