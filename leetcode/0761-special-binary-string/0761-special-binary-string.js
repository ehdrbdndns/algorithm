/**
 * 761. Special Binary String
 * 핵심:
 * - special 문자열을 "최상위(primitive) special 블록"들로 분해 (balance가 0 되는 지점마다 끊기)
 * - 각 블록은 항상 "1 + inside + 0" 형태이므로 inside를 재귀적으로 최대로 만든다
 * - 최대로 만든 블록들을 문자열 내림차순 정렬 후 이어붙이면 lexicographically largest
 *
 * @param {string} s
 * @return {string}
 */
var makeLargestSpecial = function (s) {
  // 길이가 0/2면 더 이상 바꿀 게 없음 ("", "10" 등)
  if (s.length <= 2) return s;

  let balance = 0;
  let start = 0;
  const parts = [];

  // balance가 0이 되는 순간까지가 "최상위 special 블록" 1개
  for (let i = 0; i < s.length; i++) {
    balance += (s[i] === "1") ? 1 : -1;

    if (balance === 0) {
      // s[start..i] 가 하나의 special 블록
      // 블록은 항상 1 ... 0 이므로 inside = (start+1 .. i-1)
      const inside = s.slice(start + 1, i);
      const bestInside = makeLargestSpecial(inside);

      parts.push("1" + bestInside + "0");
      start = i + 1;
    }
  }

  // 사전순(lexicographic) 내림차순 정렬 후 이어붙이기
  parts.sort((a, b) => b.localeCompare(a));
  return parts.join("");
};