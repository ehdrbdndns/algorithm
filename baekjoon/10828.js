class CStack {
  constructor() {
    this.datas = [];
  }

  push(data) {
    this.datas.push(data);
  }

  pop() {
    if (this.size()) {
      return this.datas.pop();
    } else {
      return -1;
    }
  }

  size() {
    return this.datas.length;
  }

  empty() {
    if (this.size()) {
      return 0;
    } else {
      return 1;
    }
  }

  top() {
    if (this.size()) {
      return this.datas[this.size() - 1];
    } else {
      return -1;
    }
  }
}

/**
 * Solution Function
 * @param {number} n
 * @param {string[]} input
 */
function solution(n, input) {
  let result = [];

  // 입력 값 다루기
  const list = input.map((i) => {
    const arr = i.split(' ');
    return {
      order: arr[0],
      data: arr[1],
    };
  });

  const stack = new CStack();

  for (let i = 0; i < n; i++) {
    const item = list[i];
    switch (item.order) {
      case 'push':
        stack.push(item.data);
        break;
      case 'pop':
        result.push(stack.pop());
        break;
      case 'size':
        result.push(stack.size());
        break;
      case 'empty':
        result.push(stack.empty());
        break;
      case 'top':
        result.push(stack.top());
        break;
      default:
        result.push('can not found order');
        break;
    }
  }

  console.log(result.join('\n'));
}

const fs = require('fs');
const [n, ...input] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

// let testData = `14
// push 1
// push 2
// top
// size
// empty
// pop
// pop
// pop
// size
// empty
// pop
// push 3
// empty
// top`;
// const [n, ...input] = testData.split('\n');

solution(parseInt(n), input);
