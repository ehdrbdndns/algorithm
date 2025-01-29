class Solution {
    func sortedSquares(_ nums: [Int]) -> [Int] {
        return nums.map({ (num: Int) -> Int in 
            return num * num
        }).sorted {$0 < $1}
    }
}