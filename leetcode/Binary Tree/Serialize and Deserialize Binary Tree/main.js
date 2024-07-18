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

    if (this.count === 0) {
      this.head = 0;
    }

    return val;
  }

  size() {
    return this.count;
  }

  peek() {
    return this.queue[this.head]
  }
}

/**
* Definition for a binary tree node.
* function TreeNode(val) {
*     this.val = val;
*     this.left = this.right = null;
* }
*/

/**
* Encodes a tree to a single string.
*
* @param {TreeNode} root
* @return {string}
*/
var serialize = function (root) {
  const result = [];
  const queue = new CustomQueue();
  queue.push(root)

  while (queue.size()) {
    const cur = queue.pop();
    result.push(cur?.val);

    if (cur === null) {
      continue;
    }

    // left
    queue.push(cur?.left);

    // right
    queue.push(cur?.right);

  }

  return result.join(', ');
};

/**
* Decodes your encoded data to tree.
*
* @param {string} data
* @return {TreeNode}
*/
var deserialize = function (data) {
  const tree = new TreeNode();
  const dataList = data.split(', ');
  const queue = new CustomQueue();
  let curIndex = 0;

  if (dataList[curIndex] === '') {
    return null;
  }

  tree.val = dataList[curIndex++] || null;
  queue.push(tree);

  while (queue.size()) {
    const cur = queue.pop();

    if (!cur) {
      continue;
    }

    let left = null;
    if (dataList[curIndex] !== '') {
      left = new TreeNode();
      left.val = dataList[curIndex++];
    } else {
      curIndex++;
    }

    let right = null;
    if (dataList[curIndex] !== '') {
      right = new TreeNode();
      right.val = dataList[curIndex++];
    } else {
      curIndex++
    }

    if (!!left) {
      cur.left = left;
      queue.push(left);
    }

    if (!!right) {
      cur.right = right;
      queue.push(right);
    }
  }

  return tree;
};

/**
* Your functions will be called as such:
* deserialize(serialize(root));
*/