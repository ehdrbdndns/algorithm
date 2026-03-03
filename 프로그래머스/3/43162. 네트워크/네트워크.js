function solution(n, computers) {
    var answer = 0;
    let visited = Array.from({length: computers.length}, () => false)
  
    for(let i = 0; i < n; i++) {
        if(!visited[i]) {
            answer++
            
            let stack = [i]
            while(stack.length) {
                let num = stack.pop()
                visited[num] = true
                for(let j = 0; j < n; j++) {
                    if(computers[num][j] === 1 && !visited[j]) {
                        stack.push(j)
                    }
                }
            }
        }
    }
    
    return answer;
}