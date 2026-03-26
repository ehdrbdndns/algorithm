function solution(n, lost, reserve) {
  const reserveSet = new Set(reserve);
  const realLost = [];
  
  // 1. 여벌도 있고 도난도 당한 학생 제거
  for (const num of lost) {
    if (reserveSet.has(num)) {
      reserveSet.delete(num);
    } else {
      realLost.push(num);
    }
  }

  // 2. 남은 도난 학생 정렬 후 앞번호부터 빌리기
  realLost.sort((a, b) => a - b);

  let answer = n;

  for (const num of realLost) {
    if (reserveSet.has(num - 1)) {
      reserveSet.delete(num - 1);
    } else if (reserveSet.has(num + 1)) {
      reserveSet.delete(num + 1);
    } else {
      answer--;
    }
  }

  return answer;
}