/**
 * @param {string} s
 * @return {number}
 */
var numSteps = function(s) {
  let steps = 0;
  let carry = 0;

  // LSB부터 MSB 직전까지 처리 (i=0은 맨 왼쪽 '1'이라 마지막에 정산)
  for (let i = s.length - 1; i > 0; i--) {
    const bit = s[i] === '1' ? 1 : 0;
    const cur = bit + carry;

    if (cur === 1) {
      // 홀수: +1 (carry=1) 후 /2 => 2 step
      steps += 2;
      carry = 1;
    } else {
      // 짝수(0 또는 2): /2 => 1 step
      steps += 1;
      // carry는 그대로 (0이면 0, 1이면 1 유지)
    }
  }

  // 맨 왼쪽 비트(항상 '1') 처리:
  // carry가 1이면 "10..." 꼴이 되어 마지막으로 1 step 더 필요
  return steps + carry;
};