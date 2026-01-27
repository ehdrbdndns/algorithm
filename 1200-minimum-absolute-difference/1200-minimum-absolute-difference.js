/**
 * @param {number[]} arr
 * @return {number[][]}
 */
var minimumAbsDifference = function(arr) {
    // sort
    arr.sort((a, b) => a - b)

    let min = 10000000
    let dict = new Map()
    for(let i = 0; i < arr.length - 1; i++) {
        const v1 = arr[i]
        const v2 = arr[i + 1]

        const diff = Math.abs(v1 - v2)

        if(!dict.has(diff)) {
            dict.set(diff, [])
        }

        dict.get(diff).push([v1, v2].sort((a, b) => a - b))

        min = min > diff ? diff : min
    }

    return dict.get(min)
};