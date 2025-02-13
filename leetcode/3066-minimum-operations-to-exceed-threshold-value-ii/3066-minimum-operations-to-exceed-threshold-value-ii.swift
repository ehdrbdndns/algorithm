class Solution {
    func minOperations(_ nums: [Int], _ k: Int) -> Int {
        var operationCount = 0;
        var numsHeap = Heap(nums);
        
        while numsHeap.min! < k {
            let min1 = numsHeap.popMin()!;
            let min2 = numsHeap.popMin()!;

            let newValue = min(min1, min2) * 2 + max(min1, min2);
            numsHeap.insert(newValue);

            operationCount += 1;
        }


        return operationCount;
    }
}