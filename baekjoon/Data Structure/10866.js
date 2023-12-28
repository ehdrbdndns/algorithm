class LinkList {
  constructor({ val, prev, next }) {
    this.value = val;
    this.prev = prev;
    this.next = next;
  }

  setPrev(val) {
    this.prev = val;
  }

  setNext(val) {
    this.next = val;
  }

  setValue(val) {
    this.value = val;
  }

  getPrev() {
    return this.prev;
  }

  getNext() {
    return this.next;
  }

  getValue() {
    return this.value;
  }
}

// Deck 구현
function solution(n, list) {
  let head = new LinkList({ val: '', prev: '', next: '' });
  let tail = head;
  let length = 0;

  let result = [];

  for (let i = 0; i < Number(n); i++) {
    let item = list[i].split(' ');
    let type = item[0];
    let value = '';
    // console.log(item);
    // console.log(head);
    // console.log(tail);
    switch (type) {
      case 'push_front':
        // 1. check empty
        // 2. true, head = value
        // 3. false, head.prev = new LinkList({val: value, next: head}); head = head.prev;
        // 4. final, length ++
        value = item[1];
        if (!length) {
          // empty
          head.setValue(value);
        } else {
          // not empty
          head.setPrev(
            new LinkList({
              val: value,
              prev: '',
              next: head,
            })
          );
          head = head.getPrev();
        }
        length++;
        break;
      case 'push_back':
        // 1. check empty
        // 2. true, head = value;
        // 3. false, tail.next = new LinkList({val: value, prev: tail}); tail = tail.next;
        // 4. fianl, length++;
        value = item[1];
        if (!length) {
          head.setValue(value);
        } else {
          tail.setNext(new LinkList({ val: value, prev: tail }));
          tail = tail.getNext();
        }
        length++;
        break;
      case 'pop_front':
        // 덱의 가장 앞에 있는 수를 빼고, 그 수를 출력한다. 만약, 덱에 들어있는 정수가 없는 경우에는 -1을 출력한다.
        // 1. check empty
        // 2. true, let num = -1;
        // 3. false, let num = head.value; head = head.next; head.prev = null; length--
        // 4. final, return num;
        if (!length) {
          value = -1;
        } else if (length === 1) {
          value = head.getValue();
          head = new LinkList({ val: '', prev: '' });
          head = tail;
          length--;
        } else {
          value = head.getValue();
          head = head.getNext();
          head.setPrev('');
          length--;
        }
        result.push(value);
        break;
      case 'pop_back':
        // 덱의 가장 뒤에 있는 수를 빼고, 그 수를 출력한다. 만약, 덱에 들어있는 정수가 없는 경우에는 -1을 출력한다.
        // 1. check empty
        // 2. true, let num = -1;
        // 3. false, let num = tail.value, tail = tail.prev; tail.next = null; length--;
        // 4. fainal, return num;
        if (!length) {
          value = -1;
        } else if (length === 1) {
          value = tail.getValue();
          length--;
          head = new LinkList({ val: '', prev: '' });
          head = tail;
        } else {
          value = tail.getValue();
          tail = tail.getPrev();
          tail.next = '';
          length--;
        }
        result.push(value);
        break;
      case 'size':
        //덱에 들어있는 정수의 개수를 출력한다.
        result.push(length);
        break;
      case 'empty':
        // 덱이 비어있으면 1을, 아니면 0을 출력한다.
        result.push(length ? 0 : 1);
        break;
      case 'front':
        // 덱의 가장 앞에 있는 정수를 출력한다. 만약 덱에 들어있는 정수가 없는 경우에는 -1을 출력한다.
        if (!length) {
          value = -1;
        } else {
          value = head.getValue();
        }
        result.push(value);
        break;
      case 'back':
        // 덱의 가장 뒤에 있는 정수를 출력한다. 만약 덱에 들어있는 정수가 없는 경우에는 -1을 출력한다.
        if (!length) {
          value = -1;
        } else {
          value = tail.getValue();
        }
        result.push(value);
        break;
      default:
        break;
    }
  }
  console.log(result.join('\n'));
}

// let test = `22
// front
// back
// pop_front
// pop_back
// push_front 1
// front
// pop_back
// push_back 2
// back
// pop_front
// push_front 10
// push_front 333
// front
// back
// pop_back
// pop_back
// push_back 20
// push_back 1234
// front
// back
// pop_back
// pop_back`;

// const [n, ...list] = test.split('\n');
const fs = require('fs');
const [n, ...list] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

// [2, 1, 3, 4]

solution(n, list);
