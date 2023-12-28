class CQueue {
  constructor(size) {
    this.datas = new Array(size);
    this.front = 0;
    this.rear = -1;
    this.size = size;
  }

  push(value) {
    if (!this.isFull()) {
      this.rear = (this.rear + 1) % this.size;
      this.datas[this.rear] = value;
    }
  }

  pop() {
    if (!this.isEmpty()) {
      let value = this.datas[this.front];

      if (this.front === this.rear) {
        this.front = 0;
        this.rear = -1;
      } else {
        this.front = (this.front + 1) % this.size;
      }

      return value;
    }
  }

  isFull() {
    return !this.isEmpty() && (this.rear + 1) % this.size === this.front;
  }

  isEmpty() {
    return this.rear === -1;
  }
}

function stringToNumberArr(arr) {
  return arr.split(' ').map((item) => Number(item));
}

// 현재 Queue에 있는 문서의 수와 중요도가 주어졌을 때, 어떤 한 문서가 몇 번째로 인쇄되는지 알아내는 것이다.
function solution(n, list) {
  let result = [];
  for (let i = 0; i < n * 2; i += 2) {
    // length: list 길이
    // target: 찾고자 하는 list의 인덱스
    const [length, target] = stringToNumberArr(list[i]);
    // 원형 큐 선언
    let queue = new CQueue(length);
    // string 배열을 number 배열로 변경
    const arr = stringToNumberArr(list[i + 1]);
    // 원형 큐에 넣어버리기~
    arr.forEach((element, i) => {
      queue.push({ element, i });
    });

    const priorArr = arr.sort((a, b) => a - b);
    let stack = 1;
    while (priorArr.length) {
      let item = queue.pop();
      // 최고 우선순위인지 확인
      if (priorArr[priorArr.length - 1] === item.element) {
        if (target === item.i) {
          // target이라면 종료
          result.push(stack);
          break;
        } else {
          // target이 아니면 print, queue와 priorArr 둘 다 pop하고 stack++
          stack++;
          priorArr.pop();
        }
      } else {
        // 우선순위에 포함되지 않으면 맨 뒤로 보냄
        queue.push(item);
      }
    }
  }
  console.log(result.join('\n'));
}

// let test = `3
// 1 0
// 5
// 4 2
// 1 2 3 4
// 6 0
// 1 1 9 1 1 1`;

// const [n, ...list] = test.split('\n');

const fs = require('fs');
const [n, ...list] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

solution(Number(n), list);
