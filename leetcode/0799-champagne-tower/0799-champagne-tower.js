/**
 * @param {number} poured
 * @param {number} query_row
 * @param {number} query_glass
 * @return {number}
 */
var champagneTower = function(poured, query_row, query_glass) {
    // DP
    // flow quentity: (poured - 1) / 2

    let map = Array.from({length: 101}, () => Array.from({length: 101}, () => 0))
    map[0][0] = poured

    let flow_quentity = poured
    for(let row = 0; row <= query_row; row++) {
        for(let col = 0; col <= row; col++) {
            let q = (map[row][col] - 1) / 2

            if(q > 0) { 
                map[row + 1][col] += q
                map[row + 1][col + 1] += q
            }
        }
    }

    return Math.min(1, map[query_row][query_glass])
};