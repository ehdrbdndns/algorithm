function solution(name) {
  let answer = 0;
  const n = name.length;

  // 세로 이동
  for (const ch of name) {
    const up = ch.charCodeAt(0) - 'A'.charCodeAt(0);
    const down = 'Z'.charCodeAt(0) - ch.charCodeAt(0) + 1;
    answer += Math.min(up, down);
  }

  // 가로 이동
  answer += getMinHorizontalMove(name);

  return answer;
}

function getMinHorizontalMove(name) {
  const n = name.length;
  let minMove = n - 1;

  for (let i = 0; i < n; i++) {
    let next = i + 1;

    while (next < n && name[next] === 'A') {
      next++;
    }

    const move1 = i * 2 + (n - next);
    const move2 = i + (n - next) * 2;

    minMove = Math.min(minMove, move1, move2);
  }

  return minMove;
}