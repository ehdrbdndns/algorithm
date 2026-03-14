function solution(numbers) {
  const digits = numbers.split('');
  const used = Array(digits.length).fill(false);
  const made = new Set();

  function dfs(current) {
    if (current.length > 0) {
      made.add(Number(current));
    }

    for (let i = 0; i < digits.length; i++) {
      if (used[i]) continue;

      used[i] = true;
      dfs(current + digits[i]);
      used[i] = false;
    }
  }

  dfs('');

  let answer = 0;
  for (const num of made) {
    if (isPrime(num)) answer++;
  }

  return answer;
}

function isPrime(num) {
  if (num < 2) return false;

  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }

  return true;
}