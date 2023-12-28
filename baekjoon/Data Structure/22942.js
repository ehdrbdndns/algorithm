function solution(n, list) {
  let isIntersection = false;
  let circle = [];

  for (let i = 0; i < n; i++) {
    const [x, r] = list[i];
    circle.push({ isOpen: true, index: i, location: x - r });
    circle.push({ isOpen: false, index: i, location: x + r });
  }

  circle.sort((a, b) => a.location - b.location);
  // console.log(circle);
  let stack = [];
  for (let i = 0; i < circle.length; i++) {
    const { isOpen, index, location } = circle[i];
    if (isOpen) {
      // 열린 괄호
      stack.push(circle[i]);
    } else {
      // 닫힌 괄호
      let prev = stack.pop();
      // 교차 된 경우
      if (prev.index !== index) {
        isIntersection = true;
        break;
      }
    }
  }

  isIntersection ? console.log('NO') : console.log('YES');
}

const fs = require('fs');
const [n, ...list] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

solution(
  Number(n),
  list.map((i) => i.split(' ').map((j) => Number(j)))
);
