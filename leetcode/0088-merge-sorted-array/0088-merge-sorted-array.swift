class Solution {
    func merge(_ nums1: inout [Int], _ m: Int, _ nums2: [Int], _ n: Int) {
        var i = 0;
        for num in nums2 {
            var index = i + m;
            
                nums1[index] = num

            i += 1
        }

        nums1.sort()
    }
}