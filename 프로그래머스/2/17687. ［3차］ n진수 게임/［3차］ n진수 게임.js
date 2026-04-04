function solution(n, t, m, p) {
    var answer = '';
    
    let totalLength = t * m
    let totalString = ""
    
    let number = 0
    while(totalString.length < totalLength) {
        totalString += number.toString(n).toUpperCase()
        number++
    }
    
    for(let cur_t = 0; cur_t < t; cur_t++) {
        answer += totalString[(p - 1) + (m * cur_t)]
    }
    
    return answer;
}