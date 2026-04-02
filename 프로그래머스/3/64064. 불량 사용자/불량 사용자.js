function solution(user_id, banned_id) {
    // 인덱스 별 가능한 user_id를 찾고, 완탐(백트래킹)으로 문제 해결
    let list = []
    
    for(let banned of banned_id) {
        let canEqualList = []
        for(let user of user_id) {
            // 길이 체크
            if(user.length !== banned.length) continue
            
            let canEqual = true
            
            // 문자 체크
            for(let i = 0; i < banned.length; i++) {
                if(banned[i] === "*") continue
                
                if(user[i] !== banned[i]) {
                    canEqual = false
                    break
                }
            }
            
            if(!canEqual) continue
            
            canEqualList.push(user)
        }
        list.push(canEqualList)
    }
    
    // dfs를 통한 완탐 구현
    let set = new Set()
    let result = new Set()
    function dfs(curIndex, id_list) {
        if(list.length === curIndex) {
            id_list.sort()
            result.add(id_list.join(''))
            return
        }
        
        for(let i = 0; i < list[curIndex].length; i++) {
            if(set.has(list[curIndex][i])) continue
            
            set.add(list[curIndex][i])
            dfs(curIndex + 1, [...id_list, list[curIndex][i]])
            set.delete(list[curIndex][i])
        }
    }
    
    dfs(0, [])
    
    return [...result].length;
}