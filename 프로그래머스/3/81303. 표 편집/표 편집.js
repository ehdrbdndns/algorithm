function solution(n, k, cmd) {
    var answer = '';
    
    // 이중 연결 리스트 생성
    let doubleLinkedList = new Map() // {node: {prev, next}}
    doubleLinkedList.set(0, [null, 1])
    doubleLinkedList.set(n - 1, [n - 2, null])
    for(let i = 1; i < n - 1; i++) {
        doubleLinkedList.set(i, [i - 1, i + 1])
    }

    let position = k
    let deletedNodeList = []
    
    // cmd 수행
    for(let c of cmd) {
        const [oper, X] = c.split(' ')
        
        // console.log(c)
        
        let curX = 0
        let nextNode = null
        let prevNode = null
        switch(oper) {
            case "D":
                // node 아래 이동
                while(curX !== Number(X)) {
                    position = doubleLinkedList.get(position)[1]
                    curX++
                }
                break
            case "U":
                // node 위로 이동
                while(curX !== Number(X)) {
                    position = doubleLinkedList.get(position)[0]
                    curX++
                }
                break
            case "C":
                // 삭제
                deletedNodeList.push(position)
                
                nextNode = doubleLinkedList.get(position)[1]
                prevNode = doubleLinkedList.get(position)[0]
                
                // 수정 필요
                if(nextNode !== null) {
                    doubleLinkedList.get(nextNode)[0] = prevNode   
                }
                if(prevNode !== null) {
                    doubleLinkedList.get(prevNode)[1] = nextNode   
                }
                
                if(nextNode !== null) {
                    position = nextNode
                } else {
                    position = prevNode   
                }
                
                break
            case "Z":
                // 되돌리기
                let deletedNode = deletedNodeList.pop()
                
                nextNode = doubleLinkedList.get(deletedNode)[1]
                prevNode = doubleLinkedList.get(deletedNode)[0]
                
                if(nextNode !== null) {
                    doubleLinkedList.get(nextNode)[0] = deletedNode   
                }
                if(prevNode !== null) {
                    doubleLinkedList.get(prevNode)[1] = deletedNode   
                }
                
                break
            default:
                throw new Error("wrong operation")
        }
        
        // console.log(`position: ${position}, deletedList: ${deletedNodeList}`)
        // console.log(doubleLinkedList)
        // console.log("====")
    }
    
    let deleteNodeSet = new Set(deletedNodeList)
    for(let i = 0; i < n; i++) {
        answer += deleteNodeSet.has(i) ? 'X' : 'O'
    }
    
    return answer;
}