/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  const result = new ListNode();
  merge(list1, list2, result);
  return result.next;
};

// top down
function merge(list1, list2, result) {
  // base case
  if (list1 === null && list2 === null) {
    return null;
  }

  if (list1 === null) {
    result.next = list2;
    return null;
  }

  if (list2 === null) {
    result.next = list1;
    return null;
  }

  // travle
  const smaller = list1.val < list2.val ? list1 : list2;
  const larger = list1.val < list2.val ? list2 : list1;

  result.next = smaller;

  // return
  return merge(smaller.next, larger, result.next);
}