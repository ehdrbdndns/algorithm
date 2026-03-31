function solution(triangle) {
    let dp = [triangle[0][0]]
    
    for (let i = 1; i < triangle.length; i++) {
        for (let j = i; j >= 0; j--) {
            if (j === 0) {
                dp[j] = dp[j] + triangle[i][j]
            } else if (j === i) {
                dp[j] = dp[j - 1] + triangle[i][j]
            } else {
                dp[j] = Math.max(dp[j - 1], dp[j]) + triangle[i][j]
            }
        }
    }
    
    return Math.max(...dp)
}