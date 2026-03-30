class Queue {
    constructor() {
        this.array = []
        this.head = 0
    }
    
    size() {
        return this.array.length - this.head
    }
    
    push(v) {
        this.array.push(v)
    }
    
    pop() {
        let result = this.array[this.head]
        delete this.array[this.head]
        this.head++
        return result
    }
    
    peek() {
        return this.array[this.head]
    }
}

function solution(n, edge) {
    var answer = 0;
    
    // graph 구하기 (Map)
    let graph = new Map()
    for(let i = 0; i < edge.length; i++) {
        let [one, two] = edge[i]
        if(!graph.has(one)) {
            graph.set(one, [])
        }
        
        if(!graph.has(two)) {
            graph.set(two, [])
        }
        
        graph.get(one).push(two)
        graph.get(two).push(one)
    }
    
    // bfs로 1번노드로부터 노드 최단거리 구하기.
    let visited = Array.from({length: n + 1}, () => -1)
    visited[1] = 1
    
    let queue = new Queue()
    queue.push(1)
    
    while(queue.size()) {
        let vertex = queue.pop()
        
        let neighbors = graph.get(vertex)
        
        for(let neigbor of neighbors) {
            if(visited[neigbor] !== -1) { continue }
        
            queue.push(neigbor)
            visited[neigbor] = visited[vertex] + 1
        }
    }
    
    visited.sort((a, b) => b - a)
    let max = visited[0]
    
    for(let visit of visited) {
        if(max === visit) { answer++ } else { break }
    }
    
    return answer;
}