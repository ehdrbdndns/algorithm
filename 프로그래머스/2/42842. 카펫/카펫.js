function solution(brown, yellow) {
    var answer = [];
    // w * h = brown + yellow
    // (w - 2) * (h - 2) = yellow
    // x * y = yellow, x = (w - 2), y = (h - 2)
    // 2w + 2h - 4 = brown
    
    // 완탐으로 yellow의 가능성을 모두 찾고, brown의 개수와
    // 맞는지 확인한다.
    
    for(let i = 1; i <= yellow; i++) {
        if(yellow % i === 0) {
            const x = i
            const y = yellow / i
            
            const w = x + 2
            const h = y + 2
            
            const brownCount = 2*w + 2*h - 4
            
            if(brownCount === brown) {
                answer = [w, h].sort((a, b) => b - a)
                break
            }
        }
    }
    return answer;
}