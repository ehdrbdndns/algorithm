/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  if (!head || !head.next) {
    return true;
  }

  let first = head;
  let second = head.next;

  // find middle index
  const record = [];
  let isOdd = false;
  while (second && second.next) {
    record.push(first.val);
    first = first.next;

    if (!second.next.next) {
      // odd
      second = second.next;
      isOdd = true;
      break;
    } else {
      // even
      second = second.next.next;
    }
  }

  if (!isOdd) {
    record.push(first.val);
  }

  for (let i = record.length - 1; i >= 0; i--) {
    first = first.next;
    if (record[i] !== first.val) {
      return false;
    }
  }

  return true;
};