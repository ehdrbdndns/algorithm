function solution(n, path, order) {
    var answer = true;
    
    // graph 생성
    let graph = new Map()
    for(let [one, two] of path) {
        if(!graph.has(one)) {
            graph.set(one, [])
        }
        
        if(!graph.has(two)) {
            graph.set(two, [])
        }
        
        graph.get(one).push(two)
        graph.get(two).push(one)
    }
    
    // 선 방문 Map
    let nodeConditionMap = new Map()
    let conditionNodeMap = new Map()
    for(let [condition, node] of order) {
        nodeConditionMap.set(node, condition)
        conditionNodeMap.set(condition, node)
    }
    let holdRoom = new Set()
    
    if (nodeConditionMap.has(0)) return false;
    
    // dfs로 순회하며 모든 노드 방문 여부 체크
    let visited = Array.from({length: n}, () => false)
    let stack = [0]
    while(stack.length) {
        let cur = stack.pop()
        
        let neighbors = graph.get(cur)
        for(let neighbor of neighbors) {
            // 기존 방문 여부 체크
            if(visited[neighbor]) { continue }
            
            // condition 체크
            if(
                nodeConditionMap.has(neighbor)
            &&  !visited[nodeConditionMap.get(neighbor)]
            ) {
                holdRoom.add(neighbor)
                continue
            }
            
            // 방문
            visited[neighbor] = true
            stack.push(neighbor)
            
            // 연쇄 방문 체크
            if(
                conditionNodeMap.has(neighbor)
            &&  holdRoom.has(conditionNodeMap.get(neighbor))
            ) {
                holdRoom.delete(conditionNodeMap.get(neighbor))
                stack.push(conditionNodeMap.get(neighbor))
                visited[conditionNodeMap.get(neighbor)] = true
            }
        }
    }
    
    return holdRoom.size === 0;
}