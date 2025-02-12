class Solution {
    func sumOfDigit(_ num: Int) -> Int {
        var result = 0;
        var copiedNum = num;
        while copiedNum > 9 {
            result += copiedNum % 10;
            copiedNum = copiedNum / 10;
        }
        result += copiedNum;

        return result;
    }
    func maximumSum(_ nums: [Int]) -> Int {
        // 1. config hash table, O(n log n)
        // { sumOfDigit: [index of nums] }

        // 2. iterate hash table and get result

        var sumOfDigitToNum: [Int: [Int]] = [:];

        for (index, num) in nums.enumerated() { // O(n)
            sumOfDigitToNum[sumOfDigit(num), default: []].append(num)
        }

        var maxiumValue = -1;
        for (_, value) in sumOfDigitToNum {
            if(value.count > 1) {
               let sortedValues = value.sorted {$0 > $1}
               let num1 = sortedValues[0];
               let num2 = sortedValues[1];

               if maxiumValue < num1 + num2 {
                    maxiumValue = num1 + num2;
               }
            }
        }

        return maxiumValue;
    }
}