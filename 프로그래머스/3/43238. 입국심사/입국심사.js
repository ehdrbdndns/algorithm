function solution(n, times) {
    var answer = 0;
    
    // 1. 탐색 범위 설정
    let maxTime = Math.max(...times) * n;
    let minTime = 1;
        
    // 2. 이분 탐색
    while (minTime <= maxTime) {
        let mid = Math.floor((minTime + maxTime) / 2);

        let count = times.reduce((a, b) => {
            return a + Math.floor(mid / b);
        }, 0);
        
        if (count >= n) {
            answer = mid;       // mid 시간 안에 n명 처리 가능
            maxTime = mid - 1;  // 더 작은 시간도 가능한지 확인
        } else {
            minTime = mid + 1;  // 시간이 부족하니 늘려야 함
        }
    }
    
    return answer;
}