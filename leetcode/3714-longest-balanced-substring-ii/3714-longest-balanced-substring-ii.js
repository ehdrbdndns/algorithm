/**
 * @param {string} s
 * @return {number}
 */
var longestBalanced = function (s) {
  const n = s.length;
  let ans = 1;

  // Case 1) 한 종류만: 최장 연속 구간
  {
    let run = 1;
    for (let i = 1; i < n; i++) {
      if (s[i] === s[i - 1]) run++;
      else run = 1;
      if (run > ans) ans = run;
    }
  }

  // Case 2) 정확히 두 종류만: (x,y,z) 중 두 문자만 남기고, 나머지 문자를 만나면 segment 리셋
  // pair: (p, q), other: o
  const solveTwo = (p, q, o) => {
    // diff = count(q) - count(p)
    let diff = 0;
    let lastReset = -1;
    const first = new Map();
    // segment 시작에서 diff=0이 존재
    first.set(0, lastReset);

    for (let i = 0; i < n; i++) {
      const ch = s[i];
      if (ch === o) {
        // 다른 문자 등장 -> 세그먼트 리셋
        diff = 0;
        lastReset = i;
        first.clear();
        first.set(0, lastReset);
        continue;
      }

      if (ch === q) diff += 1;
      else if (ch === p) diff -= 1;
      // (p/q 아닌 문자는 없음)

      if (!first.has(diff)) first.set(diff, i);

      // diff가 같았던 가장 이른 prefix index = l
      // 구간 (l, i] => 길이 i - l
      const l = first.get(diff);
      // 이 세그먼트에는 o가 없고, diff 동일 => p와 q 개수 같음
      const len = i - l;

      // "정확히 두 종류" 조건을 엄밀히 따지려면, p와 q가 둘 다 등장했는지 체크해야 함.
      // 하지만 len>=2이고 diff 동일이어도 한 종류만으로 성립하는 경우가 있어(예: "aaaa").
      // 그건 Case 1이 이미 처리했으므로, 여기서는 len만으로 갱신해도 정답은 안전.
      if (len > ans) ans = len;
    }
  };

  solveTwo('a', 'b', 'c');
  solveTwo('a', 'c', 'b');
  solveTwo('b', 'c', 'a');

  // Case 3) 세 종류 모두: key = (B-A, C-A)
  {
    let A = 0, B = 0, C = 0;
    const first = new Map();
    const key0 = '0,0';
    first.set(key0, -1);

    for (let i = 0; i < n; i++) {
      const ch = s[i];
      if (ch === 'a') A++;
      else if (ch === 'b') B++;
      else C++;

      const x = B - A;
      const y = C - A;
      const key = x + ',' + y;

      if (!first.has(key)) first.set(key, i);

      const l = first.get(key);
      const len = i - l;
      if (len > ans) ans = len;
    }
  }

  return ans;
};
