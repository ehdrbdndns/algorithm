class Solution {
    func clearDigits(_ s: String) -> String {
        let array = Array(s);
        let reversedArray = array.reversed();

        var numberCount = 0;
        var resultList: [String] = [];

        for elem in reversedArray {
            if elem.isNumber {
                numberCount += 1;
            } else {
                if numberCount == 0 {
                    resultList.append(String(elem))
                } else {
                    numberCount -= 1;
                }
            }
        }
      
        var result = "";
        for elem in resultList.reversed() {
            result += elem;
        }

        return result;
    }
}