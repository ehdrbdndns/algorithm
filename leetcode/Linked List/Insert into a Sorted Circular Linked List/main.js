/**
 * // Definition for a _Node.
 * function _Node(val, next) {
 *     this.val = val;
 *     this.next = next;
 * };
 */

/**
 * @param {_Node} head
 * @param {number} insertVal
 * @return {_Node}
 */
var insert = function (head, insertVal) {
  const insertNode = new _Node(insertVal, head);

  if (!head) {
    insertNode.next = insertNode;
    return insertNode
  }

  if (!head.next) {
    head.next = insertNode;
    return head;
  }

  let one = head;
  let targetNode = null;
  let smallestNode = head;
  let biggestNode = head;

  do {
    // get targetNode
    const diff = one.val - insertVal;
    const prevDiff = targetNode ? targetNode.val - insertVal : 0;

    if (diff <= 0 && (!targetNode || prevDiff <= diff)) {
      targetNode = one;
    }

    // get smallestNode
    if (one.next.val < smallestNode.next.val) {
      smallestNode = one;
    } else if (one.next === head && one.next.val <= smallestNode.next.val) {
      smallestNode = one;
    }

    // get biggestNode
    if (one.val > biggestNode.val) {
      biggestNode = one;
    }

    one = one.next;
  } while (one !== head)

  if (smallestNode.next.val >= insertVal) {
    targetNode = smallestNode
  } else if (biggestNode.val <= insertVal) {
    targetNode = biggestNode;
  }

  const pivot = targetNode;
  while (targetNode.next.val === targetNode.val) {
    targetNode = targetNode.next;
    if (targetNode.next === pivot) {
      break;
    }
  }

  const temp = targetNode.next;
  targetNode.next = insertNode;
  insertNode.next = temp;

  return head;
};