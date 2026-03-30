function solution(people, limit) {
    var answer = 0;
    
    // 최대한 적게 사용해서 모든 사람을 구출
    // 두 사람간의 무게 차가 적어야 함.
    
    people.sort((a, b) => b - a)
    let front = 0
    let rear = people.length - 1

    while(front <= rear) {
        if(people[front] + people[rear] > limit) {
            front++
        } else {
            front++
            rear--
        }
        
        answer++
    }
    
    return answer;
}