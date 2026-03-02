function solution(numbers, target) {
    var answer = 0;
    
    let stack = [] // {num, index}
    stack.push({num: numbers[0], index: 0})
    stack.push({num: -numbers[0], index: 0})
    
    while(stack.length !== 0) {
        let {num, index} = stack.pop()
        
        if(index + 1 >= numbers.length) {
            if(num === target) { answer++ }
            continue
        }
        
        stack.push({num: num + numbers[index + 1], index: index + 1})
        stack.push({num: num - numbers[index + 1], index: index + 1})
    }
    
    return answer;
}