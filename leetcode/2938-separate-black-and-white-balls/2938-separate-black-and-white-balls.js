/**
 * @param {string} s
 * @return {number}
 */
var minimumSteps = function (s) {
    // 1 is black, 0 is white
    // 최소한의 횟수로 1과 0의 그룹을 만들어라. 
    // 1 position right, 0 position left

    // two point
    let blackPoint = -1;

    // find first black position in s
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '1') {
            blackPoint = i;
            break;
        }
    }

    // check edge: s don't have '1'
    if (blackPoint === -1) {
        return 0;
    }

    let result = 0;
    for (let i = blackPoint; i < s.length; i++) {
        if(s[i] === '0') {
            result += i - blackPoint;
            blackPoint++;
        }
    }

    return result;
};