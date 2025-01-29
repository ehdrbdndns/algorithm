class Solution {
    func findNumbers(_ nums: [Int]) -> Int {
        var evenDigitCount = 0;
        for num in nums {
            var digitCount: Int = 1;
            var copiedNum = num;

            while copiedNum >= 10 {
                digitCount += 1;
                copiedNum /= 10;
            }

            if (digitCount % 2) == 0 {
                evenDigitCount += 1;
            }
        }

        return evenDigitCount;
    }
}