function solution(n, list) {
  const arr = [Number.MAX_VALUE];
  const result = [];

  for (let i = 0; i < n; i++) {
    if (list[i] === 0) {
      // // pop
      if (arr.length === 1) {
        result.push(0);
        continue;
      }

      result.push(arr[1]);
      arr[1] = arr[arr.length - 1];
      arr.pop();
      let curIndex = 1;
      let childIndex = 2;
      while (
        (arr[curIndex] < arr[childIndex] ||
          arr[curIndex] < arr[childIndex + 1]) &&
        arr[childIndex] !== undefined
      ) {
        if (arr[childIndex + 1] !== undefined) {
          childIndex =
            arr[childIndex + 1] < arr[childIndex] ? childIndex : childIndex + 1;
        }
        [arr[curIndex], arr[childIndex]] = [arr[childIndex], arr[curIndex]];
        curIndex = childIndex;
        childIndex *= 2;
      }
    } else {
      // insert
      arr.push(list[i]);
      let rootIndex = Math.floor((arr.length - 1) / 2);
      let curIndex = arr.length - 1;
      while (arr[curIndex] > arr[rootIndex]) {
        [arr[curIndex], arr[rootIndex]] = [arr[rootIndex], arr[curIndex]];
        [rootIndex, curIndex] = [Math.floor(rootIndex / 2), rootIndex];
      }
    }
  }

  console.log(result.join('\n'));
}

// let [n, ...list] = `13
// 0
// 1
// 2
// 0
// 0
// 3
// 2
// 1
// 0
// 0
// 0
// 0
// 0`.split('\n');

const fs = require('fs');
const [n, ...list] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

solution(
  n,
  list.map((i) => Number(i))
);
