class Solution {
    func solve(_ board: inout [[Character]]) {
        let N = board.count
        let M = board[0].count

        let DIR_LIST = [[1, 0], [-1, 0], [0, 1], [0, -1]]
        var visited = Array(
            repeating: Array(repeating: false, count: M)
            , count: N
        )
        var stack: Array<Array<Int>> = Array();
        for n in 0...N - 1 {
            // 맨 왼쪽, 오른쪽
            stack.append([n, 0])
            stack.append([n, M - 1])

            // 중간 
            if((n == 0 || n == N - 1) && M > 2) {
                for m in 1...M - 2 {
                    stack.append([n, m])
                }
            }
        }

        // print("finished setting stack")
        // print("stack: \(stack)");

        // DFS
        while(stack.count > 0) {
            guard let pos = stack.popLast() else { continue }
            let n = pos[0]
            let m = pos[1]

            if(board[n][m] == "X") {
                continue
            }

            visited[n][m] = true

            // print("Max N, M: \(N - 1), \(M - 1)")
            for dir in DIR_LIST {
                let newN = n + dir[0]
                let newM = m + dir[1]

                // print(newN, newM)

                // check "out"
                if(
                    N <= newN || newN < 0
                ||  M <= newM || newM < 0
                ) {
                    // print("out")
                    continue
                }

                // check "visited"
                if(visited[newN][newM]) { 
                    // print("visited")
                    continue 
                }
                
                // check "X"
                if(board[newN][newM] == "X") {
                    // print("X")
                    continue 
                }

                visited[newN][newM] = true;
                stack.append([newN, newM])
            }
        }

        for (n, col) in board.enumerated() {
            for (m, row) in col.enumerated() {
                if(!visited[n][m]) {
                    board[n][m] = "X"
                }
            }
        }
    }
}