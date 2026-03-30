function solution(N, number) {
    // N 자체로 만들 수 있으면 바로 종료
    if (N === number) return 1;

    // dp[i] = N을 i번 사용해서 만들 수 있는 모든 숫자들의 집합
    const dp = Array.from({ length: 9 }, () => new Set());

    // N은 최대 8번까지만 사용 가능
    for (let i = 1; i <= 8; i++) {

        // 1️⃣ "붙이기" 처리
        // 예: N=5 → i=3이면 "555"
        const repeated = Number(String(N).repeat(i));
        dp[i].add(repeated);

        // 2️⃣ 이전 결과들을 조합해서 dp[i] 만들기
        // i = j + (i-j) 형태로 쪼개기
        for (let j = 1; j < i; j++) {

            // dp[j]와 dp[i-j]를 전부 조합
            for (const a of dp[j]) {
                for (const b of dp[i - j]) {

                    // 사칙연산 전부 수행
                    dp[i].add(a + b); // 더하기
                    dp[i].add(a - b); // 빼기
                    dp[i].add(a * b); // 곱하기

                    // 나누기 (0으로 나누는 것 방지)
                    if (b !== 0) {
                        dp[i].add(Math.floor(a / b));
                    }
                }
            }
        }

        // 3️⃣ 현재 단계에서 목표 number가 만들어졌으면
        // 가장 작은 i이므로 바로 반환
        if (dp[i].has(number)) {
            return i;
        }
    }

    // 8번까지 써도 못 만들면 -1
    return -1;
}