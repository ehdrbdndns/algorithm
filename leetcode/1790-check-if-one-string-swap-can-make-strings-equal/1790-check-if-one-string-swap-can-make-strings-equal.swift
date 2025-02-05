class Solution {
    func areAlmostEqual(_ s1: String, _ s2: String) -> Bool {
        let s1Array = Array(s1);
        let s2Array = Array(s2);

        let sortedS1 = s1Array.sorted { $0 < $1 }
        let sortedS2 = s2Array.sorted { $0 < $1 }

        var diffCount = 0;
        for i in 0..<sortedS1.count {
            if(s1Array[i] != s2Array[i]) {
                diffCount += 1;
            }

            if(sortedS1[i] != sortedS2[i]) {
                return false;
            }
        }

        return diffCount < 3
    }
}