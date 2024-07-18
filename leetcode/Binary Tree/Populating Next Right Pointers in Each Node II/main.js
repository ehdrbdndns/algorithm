class CustomQueue {
  constructor() {
    this.queue = [];
    this.head = 0;
    this.count = 0;
  }

  push(val) {
    this.queue[this.head + this.count] = val;
    this.count++;
  }

  pop() {
    const val = this.queue[this.head];
    this.head++;
    this.count--;

    if (this.empty()) {
      this.head = 0;
    }

    return val;
  }

  size() {
    return this.count;
  }

  empty() {
    return this.count === 0;
  }

  setNext() {
    for (let i = 0; i < (this.count - 1); i++) {
      this.queue[this.head + i].next = this.queue[this.head + i + 1];
    }
  }
}

/**
* // Definition for a _Node.
* function _Node(val, left, right, next) {
*    this.val = val === undefined ? null : val;
*    this.left = left === undefined ? null : left;
*    this.right = right === undefined ? null : right;
*    this.next = next === undefined ? null : next;
* };
*/

/**
* @param {_Node} root
* @return {_Node}
*/
var connect = function (root) {
  const queue = new CustomQueue();
  queue.push(root);

  let maxCount = 1;
  let childCount = 0;
  let travelCount = 0;

  while (!queue.empty()) {
    // next
    if (travelCount === maxCount) {
      // set next
      queue.setNext();

      // init level and travleCount
      travelCount = 0;
      maxCount = childCount;
      childCount = 0;
    }

    // search
    const cur = queue.pop();
    if (!!cur?.left) {
      queue.push(cur.left);
      childCount++;
    }

    if (!!cur?.right) {
      queue.push(cur.right);
      childCount++;
    }

    travelCount++;
  }

  return root;
};