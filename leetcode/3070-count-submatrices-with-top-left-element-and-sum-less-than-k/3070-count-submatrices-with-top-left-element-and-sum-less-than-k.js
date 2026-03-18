/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
var countSubmatrices = function(grid, k) {
    const m = grid.length;
    const n = grid[0].length;

    let answer = 0;

    const prefix = Array.from({ length: m }, () => Array(n).fill(0));

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            const up = r > 0 ? prefix[r - 1][c] : 0;
            const left = c > 0 ? prefix[r][c - 1] : 0;
            const diag = (r > 0 && c > 0) ? prefix[r - 1][c - 1] : 0;

            prefix[r][c] = grid[r][c] + up + left - diag;

            if (prefix[r][c] <= k) {
                answer++;
            }
        }
    }

    return answer;
};