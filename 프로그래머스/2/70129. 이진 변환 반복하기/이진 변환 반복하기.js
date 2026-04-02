function solution(s) {
    let iterCount = 0
    let zeroCount = 0
    while(s !== '1') {
        let newS = ""
        
        for(let c of s) {
            if(c === "1") {
                newS += "1"
            } else {
                zeroCount++
            }
        }
        
        s = newS.length.toString(2)
        
        iterCount++
    }
    
    return [iterCount, zeroCount];
}