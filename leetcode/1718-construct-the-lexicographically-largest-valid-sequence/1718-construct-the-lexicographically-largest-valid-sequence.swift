class Solution {
    func constructDistancedSequence(_ n: Int) -> [Int] {
        
        func dfs(_ index: Int) -> Bool {
            if index == current.count {
                result = current
                return true
            }
            if current[index] != 0 {
                return dfs(index + 1)
            }
            
            for num in stride(from: n, to: 0, by: -1) where !used[num] {
                if num == 1 {
                    current[index] = 1
                    used[1] = true
                    if dfs(index + 1) { return true }
                    used[1] = false
                    current[index] = 0
                } else if index + num < current.count, current[index + num] == 0 {
                    current[index] = num
                    current[index + num] = num
                    used[num] = true
                    if dfs(index + 1) { return true }
                    used[num] = false
                    current[index] = 0
                    current[index + num] = 0
                }
            }
            return false
        }
        
        var current = Array(repeating: 0, count: 2 * n - 1)
        var used = Array(repeating: false, count: n + 1)
        var result: [Int] = []
        
        dfs(0)
        return result
    }
}