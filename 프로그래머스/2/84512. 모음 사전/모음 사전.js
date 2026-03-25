function solution(word) {
    var answer = 0;
    const WORD_SIZE = 5
    const LIB = {
        'A': 1,
        'E': 2,
        'I': 3,
        'O': 4,
        'U': 5
    }
    
    let wordList = word.split("")
    for(let i = 0; i < wordList.length; i++) {
        let word = wordList[i]
        
        let previousCount = 0
        console.log(`===${word}, ${i}===`)
        for(let j = 0; j < WORD_SIZE - i - 1; j++) {
            console.log(`${WORD_SIZE} ** ${(j + 1)}: `, WORD_SIZE ** (j + 1))
            previousCount += WORD_SIZE ** (j + 1)
        }
        previousCount *= LIB[word] - 1
        previousCount += LIB[word]
        
        answer += previousCount
        console.log(`previouseCount: ${previousCount}, result: ${answer}`)
    }
    
    console.log(answer)
    
    return answer;
}