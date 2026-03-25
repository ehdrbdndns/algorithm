function solution(tickets) {
    var answer = [];
    
    // dfs, 백트래킹으로 완탐
    // 모든 경로 찾고, 정렬 수행
    
    // 항공권을 토대로 트리 구조 생성 { 공항: {공항, 티켓 인덱스}[] }
    let tree = new Map()
    for(let i = 0; i < tickets.length; i++) {
        let [start, end] = tickets[i]
        
        if(!tree.has(start)) {
            tree.set(start, [])
        }
        
        tree.get(start).push({"airplane": end, i_ticket: i})
    }
    
    // dfs + back 트래킹 돌면서 모든 경로 저장
    let routes = []
    let visited = Array.from({length: tickets.length}, () => false)
    let stack = [{cur_airplane: "ICN", route: "ICN"}]
    
    function dfs(cur_airplane, route) {
        let targets = tree.get(cur_airplane)
        
        // 모든 곳의 방문이 다 되어 있으면 종료
        let flag = false
        
        if(!targets) {
            flag = true
        } else {
            flag = true
            for(let { i_ticket } of targets) {
                if(visited[i_ticket] === false) {
                    flag = false
                    break
                }
            }
        }
        
        if(flag) {
            if(route.split("-").length === tickets.length + 1) {
             routes.push(route)   
            }
            return
        }
        
        for(let {airplane, i_ticket} of targets) {
            // check visited
            if(visited[i_ticket]) { continue }
            
            // 방문 처리
            visited[i_ticket] = true
            
            // 실제 방문
            dfs(airplane, route + `-${airplane}`)
            
            // 방문 처리 취소
            visited[i_ticket] = false
        }
    }
    
    dfs("ICN", "ICN")
    
    // 알파벳 순 정렬
    routes.sort()
    
    return routes[0].split("-");
}