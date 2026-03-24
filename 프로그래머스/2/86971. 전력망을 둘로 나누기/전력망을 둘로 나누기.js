function solution(n, wires) {
    var answer = 100;
    
    // 이것도 완탐...?
    // n의 개수가 적으니까.
    
    // wires를 통해 map 자료구조 기반 tree 생성
    let networkCount = 0
    let tree = new Map()
    for(let i = 0; i < wires.length; i++) {
        let [top1, top2] = wires[i]
        
        if(!tree.has(top1)) { tree.set(top1, []) }
        if(!tree.has(top2)) { tree.set(top2, []) }
        
        tree.get(top1).push(top2)
        tree.get(top2).push(top1)
        
        networkCount = Math.max(networkCount, top1)
        networkCount = Math.max(networkCount, top2)
    }
    
    console.log(networkCount)
    
    // 와이어를 완탐 하며, dfs로 양 송신탑의 네트워크 개수 계산(O(n^2))
    for(let i = 0; i < wires.length; i++) {
        let [top1, top2] = wires[i]
        
        // dfs로 양 송신탐 네트워크 수 계산
        let networkCountOfTop1 = dfs(top1, top2)
        let networkCountOfTop2 = networkCount - networkCountOfTop1
        // console.log(networkCount, networkCountOfTop1, networkCountOfTop2)
        // console.log("===")
        let diff = Math.abs(networkCountOfTop1 - networkCountOfTop2)
        
        answer = Math.min(answer, diff)
    }
    
    function dfs(top1, top2) {
        let count = 0
        
        let stack = []
        let visited = Array.from({length: networkCount}, () => false)
        visited[top2] = true
        visited[top1] = true
        
        stack.push(top1)
        while(stack.length) {
            let top = stack.pop()
            count++
            
            let subtree = tree.get(top)
            for(let i = 0; i < subtree.length; i++) {
                if(visited[subtree[i]]) { continue }
                
                visited[subtree[i]] = true
                stack.push(subtree[i])
            }
        }
        
        // if(top1 === 2 && top2 === 3) {
        //     console.log(tree)
        //     console.log(count)   
        // }
                
        return count
    }
    
    
    return answer;
}