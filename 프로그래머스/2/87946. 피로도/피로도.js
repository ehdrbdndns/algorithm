function solution(k, dungeons) {
    var answer = 0
    
    // 최소 필요 피로도, 소모 피로도
    // 현재 피로도 k, {최소 필요 피로도, 소모 피로도}[] dungeons
    // 최대한 많은 던전 탐험해야 함.
    
    // 완탐으로 돌면서 count 세면 되겠다.
    
    let visited = Array.from({length: dungeons.length}, () => false)
    
    function fullSearch(curK, count) {
        // answer 계산
        answer = Math.max(answer, count)
        
        // 탐색(백트래킹)
        for(let i = 0; i < dungeons.length; i++) {
            // 예외처리, 방문여부, 피로도 여부
            if(visited[i]) { continue }
            if(curK < dungeons[i][0]) { continue }
            
            // 방문 처리
            visited[i] = true
            let leftK = curK - dungeons[i][1]
                
            // 탐색
            fullSearch(leftK, count + 1)
            
            // 백트래킹
            visited[i] = false
        }
    }
    
    fullSearch(k, 0)
    
    return answer;
}