class Solution {
    func findNumbers(_ nums: [Int]) -> Int {
        var evenDigitCount = 0;
        for num in nums {
            var stringNum = String(num);
            
            if (stringNum.length % 2) == 0 {
                evenDigitCount += 1;
            }
        }

        return evenDigitCount;
    }
}