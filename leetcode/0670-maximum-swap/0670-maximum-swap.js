/**
 * @param {number} num
 * @return {number}
 */
var maximumSwap = function(num) {
    const digitList = String(num).split('').map((v, i) => [i, Number(v)]);
    
    // find largest num without last digit
    const sortedDigitList = [...digitList].sort((a, b) => {
        if(b[1] === a[1]) {
            return a[0] - b[0];
        } else {
            return b[1] - a[1];   
        }
    });

    let sortedDigitIndex = 0;
    let digitIndex = 0;
    let swapIndex = 0;
    let swapValue = 0;
    while(digitList.length > digitIndex && sortedDigitList.length > sortedDigitIndex) {
        if(sortedDigitList[sortedDigitIndex][1] === digitList[digitIndex][1]) {
            digitIndex++;
            sortedDigitIndex++;
            continue;
        }

        if(sortedDigitList[sortedDigitIndex][1] < digitList[digitIndex][1]) {
            digitIndex++;
            continue;
        }

        swapIndex = sortedDigitList[sortedDigitIndex][0];
        swapValue = sortedDigitList[sortedDigitIndex][1];
        break;
    }

    if(swapIndex === 0) {
        return num;
    }

    for(let i = sortedDigitIndex; i < sortedDigitList.length; i++) {
        if(sortedDigitList[i][1] === swapValue) {
            swapIndex = sortedDigitList[i][0]
        }
    }

    console.log(sortedDigitList);
    console.log(digitList);
    console.log(swapIndex);

    // find swap place
    for(let i = 0; i < swapIndex; i++) {
        if(digitList[i][1] < digitList[swapIndex][1]) {
            const temp = digitList[i];
            digitList[i] = digitList[swapIndex];
            digitList[swapIndex] = temp;
            break;
        } else {
            continue;
        }
    }

    const result = digitList.map(v => v[1]).reduce((a, b, i) => {
        return a + (b * Math.pow(10, (digitList.length - i - 1)));
    }, 0)

    return result;
};