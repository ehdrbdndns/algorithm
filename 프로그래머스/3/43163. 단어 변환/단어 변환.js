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
        let v = this.array[this.head]
        delete this.array[this.head]
        this.head++
        return v
    }
}

function solution(begin, target, words) {
    // 알고리즘
    // 알파벳 하나씩, bfs를 진행하는데 알파벳을 26개 다 적용시켜보면서
    // visited는 map으로 구현하고 key는 word, value는 방문 순서로 진행
    
    // visited 구하기
    let visited = new Map()
    for(let word of words) {
        visited.set(word, 0)
    }
    visited.set(begin, 0)
    
    // edge case
    if(!visited.has(target)) {
        return 0
    }
    
    let queue = new Queue()
    queue.push(begin)
    
    while(queue.size()) {
        const word = queue.pop()
        
        // find one diff word from words
        for(let i = 0; i < words.length; i++) {
            if(visited.get(words[i]) !== 0) { continue }
            
            let count = 0
            for(let j = 0; j < words[i].length; j++) {
                if(word[j] !== words[i][j]) {
                    count++
                }
            }
         
            if(count !== 1) { continue }
            
            queue.push(words[i])
            visited.set(words[i], visited.get(word) + 1)
            
            if(words[i] === target) { break }
        }
    }
    
    return visited.get(target);
}