class MinHeap {
    constructor() {
        this.array = [] // {node, cost}[]
    }
    
    size() {
        return this.array.length
    }
    
    peek() {
        return this.array[0]
    }
    
    push(v) {
        this.array.push(v)
        this._heapUp()
    }
    
    pop() {
        if(this.size() === 0) { return }
        if(this.size() === 1) { return this.array.pop() }
        
        let result = this.array[0]
        this.array[0] = this.array.pop()
        this._heapDown()
        return result
    }
    
    _heapDown() {
        let index = 0
        while(index < this.array.length) {
            // 자식 인덱스
            let left = index * 2 + 1
            let right = index * 2 + 2
            let smallest = index
            
            if(
                left < this.array.length 
            &&  this.array[left].cost < this.array[smallest].cost
            ) {
                smallest = left
            }
            
            if(
                right < this.array.length 
            &&  this.array[right].cost < this.array[smallest].cost
            ) {
                smallest = right
            }
            
            if(smallest === index) {
                break
            }
            
            this._switch(index, smallest)
            index = smallest
        }
    }
    
    _heapUp() {
        let index = this.array.length - 1
        while(index > 0) {
            // 부모 인덱스
            let parent = Math.floor((index - 1) / 2)
            
            if(this.array[parent].cost < this.array[index].cost) {
                break
            }
            
            this._switch(parent, index)
            index = parent
        }
    }
    
    _switch(a, b) {
        [this.array[a], this.array[b]] = [this.array[b], this.array[a]]
    }
}

function solution(n, costs) {
    var answer = 0;
    
    // graph 생성
    let graph = new Map()
    
    for(let [one, two, cost] of costs) {
        if(!graph.has(one)) {
            graph.set(one, [])
        }
        
        if(!graph.has(two)) {
            graph.set(two, [])
        }
        
        graph.get(one).push({node: two, cost: cost})
        graph.get(two).push({node: one, cost: cost})
    }
    
    // 처음 0 노드를 minHeap에 넣고 다익스트라 알고리즘 진행
    let minHeap = new MinHeap()
    minHeap.push({node: 0, cost: 0})
    
    let visited = Array.from({length: n}, () => false)
    let visitedCount = 0
    
    while(minHeap.size()) {
        let {node, cost} = minHeap.pop()
        if(visited[node]) { continue }
        visited[node] = true
        answer += cost
        visitedCount++
        
        if(visitedCount === n) {
            break
        }
        
        let neighbors = graph.get(node)
        for(let neighbor of neighbors) {
            if(visited[neighbor.node]) { continue }
            
            minHeap.push({node: neighbor.node, cost: neighbor.cost})
        }
    }
    
    return answer;
}