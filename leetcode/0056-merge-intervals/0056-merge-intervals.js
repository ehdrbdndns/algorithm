/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    let result = [];
    
    intervals.sort((a, b) => {
        return a[0] - b[0]
    })

    let rear = 0;
    let tail = 1;
    let overlapped = intervals[rear];
    while(tail < intervals.length) {
        // rear의 end와 tail의 start 비교
        let end = overlapped[1];
        let start = intervals[tail][0];

        if(end >= start) {
            // overlapping
            let lagestEnd = overlapped[1] > intervals[tail][1] ? overlapped[1] : intervals[tail][1]
            overlapped = [overlapped[0], lagestEnd]
        } else {
            // not overlapping
            result.push(overlapped);
            overlapped = intervals[tail];
        }

        tail++;
    }

    result.push(overlapped);

    return result;
};