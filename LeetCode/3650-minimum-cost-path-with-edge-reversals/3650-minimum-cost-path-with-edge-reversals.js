class CustomHeap {
    constructor() {
        this.heap = [] // {node, value}
    }

    size() {
        return this.heap.length
    }

    push(val) {
        this.heap.push(val)
        this._heapup()
    }

    pop() {
        if(this.heap.length === 0) { return }
        if(this.heap.length === 1) { return this.heap.pop() }

        const result = this.heap[0]
        this.heap[0] = this.heap.pop()
        this._heapdown()
        return result
    }

    _heapup() {
        let index = this.heap.length - 1
        
        while(index > 0) {
            let parent = Math.floor((index - 1) / 2)

            // 종료 조건(부모의 u가 더 작을 경우 종료)
            if(this.heap[parent].value < this.heap[index].value) {
                break
            }

            // 수행
            this._switch(index, parent)
            index = parent
        }
    }

    _heapdown() {
        let index = 0

        while(index < this.heap.length - 1) {
            let left = index * 2 + 1
            let right = index * 2 + 2
            let smallest = index

            if(
                left < this.heap.length
            &&  this.heap[left].value < this.heap[smallest].value
            ) {
                smallest = left
            }

            if(
                right < this.heap.length
            &&  this.heap[right].value < this.heap[smallest].value
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

    _switch(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]
    }
}

/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var minCost = function(n, edges) {
    // 풀이: 다익스트라 -> 최소 힙을 활용한 다익스트라.
    
    // edge를 통해 graph 형태로 변화
    let graph = Array.from({ length: n }, () => [])
    for(let i = 0; i < edges.length; i++) {
        const [u, v, w] = edges[i]
        
        graph[u].push(edges[i])

        const reversedEdge = [v, u, w * 2]
        let [ru, rv, rw] = reversedEdge
        graph[ru].push(reversedEdge)
    }

    // dijkstra 배열 셋팅
    let dijkstra = Array(n).fill(Infinity)
    dijkstra[0] = 0

    // heap 셋팅
    let heap = new CustomHeap()
    heap.push({node: 0, value: 0})

    // dijkstra 알고리즘 실행
    while(heap.size()) {
        let node = heap.pop()

        // 인근 노드
        const adjacentNodes = graph[node.node]

        for(let i = 0; i < adjacentNodes.length; i++) {
            const [u, v, w] = adjacentNodes[i]

            let newWeight = node.value + w

            // dijkstra 테이블 업데이트
            if(dijkstra[v] > newWeight) {
                dijkstra[v] = newWeight
                // heap 업데이트
                heap.push({node: v, value: newWeight})
            }
        }
    }

    const result = dijkstra[n - 1] === Infinity ? -1 : dijkstra[n - 1]
    return result
};