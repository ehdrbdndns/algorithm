function solution(n, results) {
    var answer = 0;
    
    // 풀이
    // dfs를 통해서 노드 깊이 값을 반환 -> cost
    // win, lost cost를 더해서 값이 n - 1이면 순위를 정할 수 있음
    
    // graph, reverseGraph 구하기
    let graph = new Map()
    let reversedGraph = new Map()
    for(let i = 1; i <= n; i++) {
        graph.set(i, [])
        reversedGraph.set(i, [])
    }
    for(let i = 0; i < results.length; i++) {
        let [one, two] = results[i]
        graph.get(one).push(two)
        reversedGraph.get(two).push(one)
    }
    
    // dfs 함수 짜기
    function dfs(player, graph) {
        let result = -1
        let visited = Array.from({length: n + 1}, () => false)
        let stack = [player]
        while(stack.length) {
            let player = stack.pop()
            result++
            let neighbors = graph.get(player)
            
            for(let neighbor of neighbors) {
                if(visited[neighbor]) { continue }
                
                visited[neighbor] = true
                stack.push(neighbor)
            }
        }
        
        return result
    }
    
    // 각 노드별로 win, lost dfs 수행
    for(let i = 1; i <= n; i++) {
        let winCount = dfs(i, graph)
        let lostCount = dfs(i, reversedGraph)
        
        console.log(i, winCount, lostCount)
        if(winCount + lostCount === n - 1) {
            answer++
        }
    }
    
    return answer;
}