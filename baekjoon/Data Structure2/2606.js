const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
let count = 0;
let nodeList;
let visitTable;
rl.question('', (answer) => {
  N = Number(answer);
  nodeList = new Array(N);
  visitTable = new Array(N);
  rl.on('line', solution).on('close', closeListener);
});

class Node {
  val = undefined;
  next = [];
  constructor(val) {
    this.val = val;
  }

  setNext(next) {
    this.next.push(next);
  }
}

function solution(line) {
  if (count) {
    const [item1, item2] = line.split(' ').map((i) => Number(i));

    const node1 = nodeList[item1] ? nodeList[item1] : new Node(item1);
    const node2 = nodeList[item2] ? nodeList[item2] : new Node(item2);

    node1.setNext(node2);
    node2.setNext(node1);

    nodeList[item1] = node1;
    nodeList[item2] = node2;
  } else {
    count++;
  }
}

function closeListener() {
  let result = 0;
  if (nodeList[1] !== undefined) {
    const stack = [];
    for (let i = 0; i < nodeList[1].next.length; i++) {
      stack.push(nodeList[1].next[i]);
      visitTable[nodeList[1].next[i].val] = 1;
      result++;
    }

    while (stack.length) {
      let node = stack.pop();

      for (let i = 0; i < node.next.length; i++) {
        let nextNode = node.next[i];

        if (visitTable[nextNode.val] === undefined && nextNode.val !== 1) {
          visitTable[nextNode.val] = 1;
          stack.push(nextNode);
          result++;
        }
      }
    }
  }

  console.log(result);
  // console.log(visitTable);
  process.exit();
}
