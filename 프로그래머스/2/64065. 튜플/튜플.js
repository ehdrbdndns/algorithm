function solution(s) {
    var answer = [];
    
    // 문자열을 배열의 형태로 변환, 배열 안 
    let s_list = s.slice(2, s.length - 2).split('},{').map((s) => s.split(','))
    
    // 배열안의 요소의 길이대로 정렬
    s_list.sort((a, b) => a.length - b.length)
    
    // Set을 사용해서, 배열을 순회하며 없는 숫자만 Set에 순서대로 기입
    let set = new Set()
    for(let s of s_list) {
        for(let v of s) {
            if(!set.has(v)) { set.add(v) }
        }
    }
    
    return [...set.values()].map((a) => Number(a));
}