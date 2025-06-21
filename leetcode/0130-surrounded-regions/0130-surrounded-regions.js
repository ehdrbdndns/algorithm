/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function (board) {
    // 겉에를 돌면서 O인 부분을 찾고, DFS를 시행
    // 그렇게 DFS를 시행한 이후 체크되지 않은 O는 전부 X로 변경

    const N = board.length;
    const M = board[0].length;

    const visited = Array.from({ length: M }, () => Array(N).fill(false));

    // 겉에 돌기
    for (let n = 0; n < N; n++) {
        DFS(n, 0)

        if (n === 0 || n === N - 1) {
            // 맨 위 혹은 맨 아래 탐색
            for (let m = 1; m < M - 1; m++) {
                // dfs
                DFS(n, m)
            }
        }

        DFS(n, M - 1)
    }

    // console.log(visited)

    for(let n = 0; n < N; n++) {
        for(let m = 0; m < M; m++) {
            if(!visited[n][m]) {
                board[n][m] = 'X'
            }
        }
    }

    function DFS(sr, sc) {
        if(board[sr][sc] === 'X') {
            return;
        }

        if (visited[sr][sc]) {
            return;
        }

        const stack = [[ sr, sc ]];
        const DIR = [[0, 1], [0, -1], [1, 0], [-1, 0]];

        while (stack.length) {
            const [row, col] = stack.pop();
            visited[row][col] = true;

            for (let i = 0; i < DIR.length; i++) {
                let newRow = row + DIR[i][0];
                let newCol = col + DIR[i][1];

                // check edge
                if(
                    N <= newRow || newRow < 0 ||
                    M <= newCol || newCol < 0
                ) {
                    continue;
                }
 
                // check visited
                if (visited[newRow][newCol]) {
                    continue;
                }

                // check X
                if (board[newRow][newCol] === 'X') {
                    continue;
                }

                visited[newRow][newCol] = true;
                stack.push([newRow, newCol])
            }
        }
    }
};