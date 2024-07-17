/**
 * // Definition for a _Node.
 * function _Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

class CustomQueue {
  constructor() {
    this.queue = [];
    this.head = 0;
    this.count = 0;
  }

  push(value) {
    this.queue[this.head + this.count] = value;
    this.count++;
  }

  pop() {
    if (this.empty()) {
      return;
    }

    const value = this.queue[this.head];
    this.head++;
    this.count--;

    if (this.empty()) {
      this.head = 0;
    }

    return value;
  }

  peek() {
    if (this.empty()) {
      return;
    }
    return this.queue[this.head];
  }

  size() {
    return this.count;
  }

  empty() {
    return this.count === 0;
  }

  print() {
    return this.queue;
  }

  setNext() {
    for (let i = 0; i < this.count - 1; i++) {
      this.queue[this.head + i].next = this.queue[this.head + i + 1];
    }
  }
}

/**
* @param {_Node} root
* @return {_Node}
*/
var connect = function (root) {
  const queue = new CustomQueue();

  queue.push(root);

  let level = 0;
  let travelCount = 0;
  while (!queue.empty()) {
    // travel by level
    if (travelCount === Math.pow(2, level)) {
      // set next
      queue.setNext();

      // init
      level++;
      travelCount = 0;
    }

    const node = queue.pop();

    node?.left && queue.push(node.left);
    node?.right && queue.push(node.right);

    travelCount++;
  }

  return root;
};