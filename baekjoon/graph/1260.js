class Queue {
  constructor() {
    this.storage = {};
    this.front = 0;
    this.rear = 0;
  }

  size() {
    if (this.storage[this.rear] === undefined) {
      return 0;
    } else {
      return this.rear - this.rear + 1;
    }
  }

  add(value) {
    if (this.size() === 0) {
      this.storage['0'] = value;
    } else {
      this.rear += 1;
      this.storage[this.rear] = value;
    }
  }

  popleft() {
    let temp;
    if (this.front === this.rear) {
      temp = this.storage[this.front];
      delete this.storage[this.front];
      this.front = 0;
      this.rear = 0;
    } else {
      temp = this.storage[this.front];
      delete this.storage[this.front];
      this.front += 1;
    }
    return temp;
  }

  peek() {
    return this.storage[this.front];
  }
}

class Node {
  val;
  next = [];
  constructor(val) {
    this.val = val;
  }

  setNext(next) {
    this.next.push(next);
  }
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let nodeList;
let V;
rl.question('', (answer) => {
  const [n, m, v] = answer.split(' ').map((i) => Number(i));
  nodeList = new Array(n);
  visitTable = new Array(n);
  V = v;
  rl.on('line', solution).on('close', closeListener);
});

function solution(line) {
  const [item1, item2] = line.split(' ').map((i) => Number(i));

  const node1 = nodeList[item1] ? nodeList[item1] : new Node(item1);
  const node2 = nodeList[item2] ? nodeList[item2] : new Node(item2);

  node1.setNext(node2);
  node2.setNext(node1);

  nodeList[item1] = node1;
  nodeList[item2] = node2;
}

function closeListener() {
  let visitTable = [];
  const queue = new Queue();
  const stack = [];
  const rootNode = nodeList[V];
  if (rootNode === undefined) {
    console.log(V);
    console.log(V);
    process.exit();
  }
  const queueResult = [rootNode.val];
  const stackResult = [rootNode.val];

  // DFS
  visitTable[rootNode.val] = 1;
  rootNode.next.sort((a, b) => b.val - a.val);
  for (let i = 0; i < rootNode.next.length; i++) {
    stack.push(rootNode.next[i]);
  }

  while (stack.length) {
    let node = stack.pop();
    if (visitTable[node.val] === undefined) {
      stackResult.push(node.val);
      visitTable[node.val] = 1;
      node.next.sort((a, b) => b.val - a.val);
      for (let i = 0; i < node.next.length; i++) {
        let nextNode = node.next[i];
        if (visitTable[nextNode.val] === undefined) {
          stack.push(nextNode);
        }
      }
    }
  }

  // BFS
  visitTable = [];
  visitTable[rootNode.val] = 1;
  rootNode.next.sort((a, b) => a.val - b.val);
  for (let i = 0; i < rootNode.next.length; i++) {
    if (visitTable[rootNode.next[i].val] === undefined) {
      queue.add(rootNode.next[i]);
      visitTable[rootNode.next[i].val] = 1;
      queueResult.push(rootNode.next[i].val);
    }
  }

  while (queue.size()) {
    let node = queue.popleft();
    node.next.sort((a, b) => a.val - b.val);
    for (let i = 0; i < node.next.length; i++) {
      let nextNode = node.next[i];
      if (visitTable[nextNode.val] === undefined) {
        queue.add(nextNode);
        visitTable[nextNode.val] = 1;
        queueResult.push(nextNode.val);
      }
    }
  }

  console.log(stackResult.join(' '));
  console.log(queueResult.join(' '));
  process.exit();
}
