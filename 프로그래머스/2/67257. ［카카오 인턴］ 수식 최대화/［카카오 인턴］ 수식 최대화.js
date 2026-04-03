function calculate(a, b, operation) {
    switch (operation) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        default:
            throw new Error("can't find operator");
    }
}

function solution(expression) {
    var answer = 0;
    
    const priorities = [
        ['+', '-', '*'],
        ['+', '*', '-'],
        ['-', '+', '*'],
        ['-', '*', '+'],
        ['*', '-', '+'],
        ['*', '+', '-'],
    ];
    
    // 숫자 / 연산자 분리
    let numbers = [];
    let operators = [];
    let num = "";
    
    for (let i = 0; i < expression.length; i++) {
        if (
            expression[i] === '+' ||
            expression[i] === '-' ||
            expression[i] === '*'
        ) {
            numbers.push(Number(num));
            operators.push(expression[i]);
            num = "";
        } else {
            num += expression[i];
        }
    }
    numbers.push(Number(num));
    
    for (let priority of priorities) {
        let _numbers = [...numbers];
        let _operators = [...operators];
        
        for (let i = 0; i < priority.length; i++) {
            let targetOperator = priority[i];
            
            let nextNumbers = [_numbers[0]];
            let nextOperators = [];
            
            for (let j = 0; j < _operators.length; j++) {
                let op = _operators[j];
                let currentNumber = _numbers[j + 1];
                
                if (op === targetOperator) {
                    let prevNumber = nextNumbers.pop();
                    let result = calculate(prevNumber, currentNumber, op);
                    nextNumbers.push(result);
                } else {
                    nextOperators.push(op);
                    nextNumbers.push(currentNumber);
                }
            }
            
            _numbers = nextNumbers;
            _operators = nextOperators;
        }
        
        answer = Math.max(answer, Math.abs(_numbers[0]));
    }
    
    return answer;
}