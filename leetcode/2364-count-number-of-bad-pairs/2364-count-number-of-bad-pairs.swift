class Solution {
    func countBadPairs(_ nums: [Int]) -> Int {
        let n = nums.count
        var dict: [Int: Int] = [:]
        for i in 0..<n {
            dict[i - nums[i], default: 0] += 1
        }
        var good = 0
        for (key, value) in dict {
            good += (value*(value-1))/2
        }
        return (n*(n-1)) / 2 - good
    }
}