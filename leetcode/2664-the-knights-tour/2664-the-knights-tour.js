/**
 * @param {number} m
 * @param {number} n
 * @param {number} r
 * @param {number} c
 * @return {number[][]}
 */
var tourOfKnight = function (m, n, r, c) {
    const DIR_LIST = [
        [2, -1], [2, 1],
        [-2, -1], [-2, 1],
        [1, 2], [-1, 2],
        [1, -2], [-1, -2],
    ];

    const MANNER = [];
    for(let i = 0; i < m; i++) {
        MANNER[i] = new Array(n).fill(-1);
    }
    MANNER[r][c] = 0;

    const MAX_ORDER = (m * n) - 1;
    let curOrder = 1;

    const recursive = (r1, c1) => {
        // base case 
        if(MAX_ORDER < curOrder) {
            return true;
        }

        for(let dir of DIR_LIST) {
            const r2 = r1 + dir[0];
            const c2 = c1 + dir[1];

            // check wall
            if(r2 < 0 || r2 >= m 
            || c2 < 0 || c2 >= n) {
                continue;
            }

            // check visit
            if(MANNER[r2][c2] !== -1) {
                continue;
            }

            // place
            MANNER[r2][c2] = curOrder++;

            // recursive
            const isFind = recursive(r2, c2);

            if(isFind) {
                return true;
            }

            // remove
            MANNER[r2][c2] = -1;
            curOrder--;
        }

        return false;
    }

    recursive(r, c);

    return MANNER;
};