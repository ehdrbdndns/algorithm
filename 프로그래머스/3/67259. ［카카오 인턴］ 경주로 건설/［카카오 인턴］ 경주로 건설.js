class MinHeap {
    constructor() {
        this.array = [] // {row, col, cost, dir}[]
    }
    
    size() {
        return this.array.length
    }
    
    peek() {
        return this.array[0]
    }
    
    push(v) {
        this.array.push(v)
        this._heapup()
    }
    
    pop() {
        if(this.size() === 0) { return }
        if(this.size() === 1) { return this.array.pop() }
        
        let result = this.array[0]
        this.array[0] = this.array.pop()
        this._heapdown()
        return result
    }
    
    _heapup() {
        let index = this.array.length - 1
        while(index > 0) {
            let parent = Math.floor((index - 1) / 2)
            
            if(this.array[parent].cost < this.array[index].cost) {
                break
            }
            
            this._switch(index, parent)
            index = parent
        }
    }
    
    _heapdown() {
        let index = 0
        while(index < this.array.length) {
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
    
    _switch(a, b) {
        [this.array[a], this.array[b]] = [this.array[b], this.array[a]]
    }
}

function solution(board) {
    var answer = 0;
    
    const N = board.length
    const WALL = 1
    const DIR = new Map()
    DIR.set("right", [0, 1])
    DIR.set("left", [0, -1])
    DIR.set("up", [-1, 0])
    DIR.set("down", [1, 0])
    
    const DIR_MAP = {
        "right": 0,
        "left": 1,
        "up": 2,
        "down": 3
    }
    
    const visited = Array.from({length: N}, () => Array.from({length: N}, () => Array.from({length: DIR.size}, () => Number.MAX_SAFE_INTEGER)))
    visited[0][0][0] = 0
    visited[0][0][1] = 0
    visited[0][0][2] = 0
    visited[0][0][3] = 0
    
    let heap = new MinHeap()
    heap.push({cost: 0, row: 0, col: 0, dir: "none"})
    
    while(heap.size()) {
        let cur = heap.pop()
        
        for(let [dir, coord] of DIR) {
            
            let newRow = coord[0] + cur.row
            let newCol = coord[1] + cur.col
            
            // edge 체크
            if(
                (N <= newRow || newRow < 0)
            ||  (N <= newCol || newCol < 0)
            ) { 
                continue
            }
            
            // 벽 체크
            if(board[newRow][newCol] === WALL) {
                continue
            }
            
            // 실 비용 확인
            let newCost = 0
            if(cur.dir === dir || cur.dir === "none") {
                newCost = cur.cost + 100
            } else {
                newCost = cur.cost + 500 + 100
            }
            
            // 비용 체크(방문 여부)
            if(visited[newRow][newCol][DIR_MAP[dir]] < newCost) {
                continue
            }
            
            // 방문
            visited[newRow][newCol][DIR_MAP[dir]] = newCost
            heap.push({cost: newCost, row: newRow, col: newCol, dir: dir})
        }
    }
    
    return Math.min(...visited[N-1][N-1]);
}