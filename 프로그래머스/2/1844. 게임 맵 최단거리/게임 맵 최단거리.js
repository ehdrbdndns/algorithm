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
}

function solution(maps) {
    var answer = 0;
    
    const DIR = [[1, 0], [-1, 0], [0, 1], [0, -1]]
    
    let visited = Array.from(
        {length: maps.length}, 
        () => Array.from({length: maps[0].length}, () => -1)
    )
    
    let queue = new Queue()
    queue.push([0, 0])
    visited[0][0] = 1
    
    while(queue.size()) {
        let [i, j] = queue.pop()
        
        for(let dir of DIR) {
            let newRow = i + dir[0]
            let newCol = j + dir[1]
            
            // check edge
            if(newRow < 0 || newRow >= maps.length) {
                continue
            } else if(newCol < 0 || newCol >= maps[0].length) {
                continue
            }
            
            // check 벽, 길
            if(maps[newRow][newCol] === 0) {
                continue
            }
            
            // check visited
            if(visited[newRow][newCol] === -1) {
                visited[newRow][newCol] = visited[i][j] + 1
                queue.push([newRow, newCol])   
            }
        }
    }
    
    return visited[maps.length - 1][maps[0].length - 1];
}