class Solution {
    func tupleSameProduct(_ nums: [Int]) -> Int {
        var distinctCount = 0;
        var productDict: [Int: Int] = [:];

        for i in 0..<nums.count {
            for j in (i + 1)..<nums.count {
                let product = nums[i] * nums[j];

                if let count = productDict[product] {
                    productDict[product] = count + 1
                } else {
                    productDict[product] = 1;
                }
            }
        }

        for (product, count) in productDict {
            if count == 1 {
                continue;
            }

            // 2 -> 8
            // 3 -> 24
            // 4 -> 48
            distinctCount += count * (count - 1) * 4
        }

        return distinctCount;
    }
}