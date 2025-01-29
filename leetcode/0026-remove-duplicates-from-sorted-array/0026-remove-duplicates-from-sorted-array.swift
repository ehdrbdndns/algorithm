class Solution {
    func removeDuplicates(_ nums: inout [Int]) -> Int {
        var visited: [Int: Bool] = [:]

        var i = 0;
        while i < nums.count {
            if let hasNum = visited[nums[i]] {
                nums.remove(at: i)
            } else {
                visited[nums[i]] = true;
                i += 1;
            }
        }

        return nums.count;
    }
}