class MinHeap {
    constructor() {
        this.array = [] // {value, index}[]
    }
    
    peek() {
        return this.array[0]
    }
    
    size() {
        return this.array.length
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
            
            if(this.array[parent].value < this.array[index].value) {
                break
            }
            
            this._switch(parent, index)
            index = parent
        }
    }
    
    _heapdown() {
        let index = 0
        while(index < this.array.length) {
            const left = index * 2 + 1
            const right = index * 2 + 2
            let smallest = index
            
            if(
                left < this.array.length
            &&  this.array[left].value < this.array[smallest].value
            ) {
                smallest = left
            }
            
            if(
                right < this.array.length
            &&  this.array[right].value < this.array[smallest].value
            ) {
                smallest = right
            }
            
            if(index === smallest) {
                break
            }
            
            this._switch(smallest, index)
            index = smallest
        }
    }
    
    _switch(a, b) {
        [this.array[a], this.array[b]] = [this.array[b], this.array[a]]
    }
}

class MaxHeap {
    constructor() {
        this.array = [] // {value, index}[]
    }
    
    peek() {
        return this.array[0]
    }
    
    size() {
        return this.array.length
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
            
            if(this.array[parent].value > this.array[index].value) {
                break
            }
            
            this._switch(parent, index)
            index = parent
        }
    }
    
    _heapdown() {
        let index = 0
        while(index < this.array.length) {
            const left = index * 2 + 1
            const right = index * 2 + 2
            let biggest = index
            
            if(
                left < this.array.length
            &&  this.array[left].value > this.array[biggest].value
            ) {
                biggest = left
            }
            
            if(
                right < this.array.length
            &&  this.array[right].value > this.array[biggest].value
            ) {
                biggest = right
            }
            
            if(index === biggest) {
                break
            }
            
            this._switch(biggest, index)
            index = biggest
        }
    }
    
    _switch(a, b) {
        [this.array[a], this.array[b]] = [this.array[b], this.array[a]]
    }
}

function solution(operations) {
    var answer = [];
    
    // min, max heap 구현
    // 동기화 진행
    
    // min, map에 대한 push pop할 시, 
    // 동기화되어있는 tree에도 진행해야 함.
    let tree = []
    let minHeap = new MinHeap();
    let maxHeap = new MaxHeap();
    
    function syncHeap() {
        while(maxHeap.size()) {
            if(!tree[maxHeap.peek().index]) {
                maxHeap.pop()
            } else {
                break
            }
        }
        
        while(minHeap.size()) {
            if(!tree[minHeap.peek().index]) {
                minHeap.pop()
            } else {
                break
            }
        }
    }
    
    for(let operation of operations) {        
        if(operation.startsWith("I")) {
            // 삽입
            const [_, value] = operation.split(" ")
            let treeIndex = tree.length
            tree.push(value)
            minHeap.push({value: Number(value), index: treeIndex})
            maxHeap.push({value: Number(value), index: treeIndex})
        } else if(operation === "D 1") {
            // 최댓값 삭제
            if(maxHeap.size()) {
                let treeIndex = maxHeap.pop().index
                delete tree[treeIndex]

                syncHeap()   
            }
        } else {
            // 최솟값 삭제
            if(minHeap.size()) {
                let treeIndex = minHeap.pop().index
                delete tree[treeIndex]

                syncHeap()   
            }
        }
    }
    
    if(minHeap.size() === 0) {
        return [0, 0]
    }
    
    return [maxHeap.peek().value, minHeap.peek().value];
}