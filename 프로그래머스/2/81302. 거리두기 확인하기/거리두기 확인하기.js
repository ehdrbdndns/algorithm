function solution(places) {
    var answer = [];
    
    const N = 5
    const DIR = [[0, 1], [0, -1], [1, 0], [-1, 0]]
    
    // 하드코드로 풀어보자.
    for(let place of places) {
        let placeList = []
        for(let row of place) {
            placeList.push(row.split(''))
        }
        
        let pList = []
        for(let row = 0; row < placeList.length; row++) {
            for(let col = 0; col < placeList[0].length; col++) {
                if(placeList[row][col] === 'P') {
                    pList.push({row, col})
                }
            }
        }
        
        let isGood = true
        for(let p of pList) {
            let visited = Array.from({length: N}, () => Array.from({length: N}, () => false))
            let stack = [{row: p.row, col: p.col, step: 0}]
            visited[p.row][p.col] = true
            while(stack.length && isGood) {
                let cur = stack.pop()
                
                if(cur.step === 2) continue
                
                for(let dir of DIR) {
                    let newRow = dir[0] + cur.row
                    let newCol = dir[1] + cur.col

                    // 엣지
                    if(
                        N <= newRow || newRow < 0
                    ||  N <= newCol || newCol < 0
                    ) {
                        continue
                    }
                    
                    // 벽 여부
                    if(placeList[newRow][newCol] === 'X') {
                       continue
                    }
            
                    // 방문 여부
                    if(visited[newRow][newCol]) {
                        continue
                    }
                    
                    // P 여부
                    if(placeList[newRow][newCol] === 'P') {
                        isGood = false
                        break
                    }
                    
                    // 방문 + step
                    if(cur.step < 2) {
                        visited[newRow][newCol] = true
                        stack.push({row: newRow, col: newCol, step: cur.step + 1})
                    }
                }
            }
            if(!isGood) {
                break
            }
        }
        
        answer.push(isGood ? 1 : 0)   
    }
    
    return answer;
}