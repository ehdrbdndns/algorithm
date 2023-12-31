class MinHeap {
  constructor() {
    this.arr = [Number.MAX_SAFE_INTEGER];
  }

  push(item) {
    this.arr.push(item);
    if (this.size() === 1) return;

    let rootIndex = Math.floor((this.arr.length - 1) / 2);
    let curIndex = this.arr.length - 1;
    while (
      Math.abs(this.arr[rootIndex]) > Math.abs(this.arr[curIndex]) ||
      (Math.abs(this.arr[rootIndex]) === Math.abs(this.arr[curIndex]) &&
        this.arr[rootIndex] > this.arr[curIndex])
    ) {
      if (rootIndex === 0) break;
      [this.arr[rootIndex], this.arr[curIndex]] = [
        this.arr[curIndex],
        this.arr[rootIndex],
      ];
      curIndex = rootIndex;
      rootIndex = Math.floor(rootIndex / 2);
    }
  }

  get() {
    if (this.size() === 0) return;
    let root = this.arr[1];
    let lastItem = this.arr.pop();
    if (this.size() === 0) return root;
    this.arr[1] = lastItem;

    let rootIndex = 1;
    while (1) {
      let leftIndex = rootIndex * 2;
      let rightIndex = rootIndex * 2 + 1;

      let childIndex = leftIndex;
      if (
        (this.arr[rightIndex] !== undefined &&
          Math.abs(this.arr[leftIndex]) > Math.abs(this.arr[rightIndex])) ||
        (Math.abs(this.arr[leftIndex]) === Math.abs(this.arr[rightIndex]) &&
          this.arr[leftIndex] > this.arr[rightIndex])
      ) {
        childIndex = rightIndex;
      }

      if (
        (this.arr[childIndex] !== undefined &&
          Math.abs(this.arr[rootIndex]) > Math.abs(this.arr[childIndex])) ||
        (Math.abs(this.arr[rootIndex]) === Math.abs(this.arr[childIndex]) &&
          this.arr[rootIndex] > this.arr[childIndex])
      ) {
        [this.arr[rootIndex], this.arr[childIndex]] = [
          this.arr[childIndex],
          this.arr[rootIndex],
        ];
      } else {
        break;
      }

      rootIndex = childIndex;
    }
    return root;
  }

  peek() {}

  size() {
    return this.arr.length - 1;
  }

  isEmpty() {
    return this.size() === 0;
  }
}

function solution(n, list) {
  const heap = new MinHeap();
  const result = [];
  for (let i = 0; i < n; i++) {
    if (list[i] === 0) {
      if (heap.size() === 0) {
        result.push(0);
      } else {
        result.push(heap.get());
      }
    } else {
      heap.push(list[i]);
      // console.log(heap.arr);
    }
  }

  console.log(result.join('\n'));
}

const fs = require('fs');
const [n, ...list] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

solution(
  Number(n),
  list.map((i) => Number(i))
);
