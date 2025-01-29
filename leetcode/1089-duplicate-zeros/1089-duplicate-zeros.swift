class Solution {
    func duplicateZeros(_ arr: inout [Int]) {
        func rightShift(_ arr: inout [Int], _ index: Int) {
            var curIndex = arr.count - 1;

            while curIndex > index {
                arr[curIndex] = arr[curIndex - 1];
                curIndex -= 1;
            }
        }

        var index = 0;
        while index < arr.count {
            if arr[index] == 0 && index + 1 < arr.count {
                index += 1
                rightShift(&arr, index)
                arr[index] = 0
            }

            index += 1
        }
    }
}