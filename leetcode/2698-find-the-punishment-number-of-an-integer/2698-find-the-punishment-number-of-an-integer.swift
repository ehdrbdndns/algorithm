class Solution {
    func isPunish(num: Int, sum: Int, target: Int) -> Bool {     
        // statement
        if sum > target {
            return false;
        }
        
        if sum + num == target {
            return true;
        }

        if num == 0 {
            return false;
        }

        var count = 1;
        var hasPunishment = false;
        while count < 4 {
            var decimal = Int(pow(10.0, Double(count)));
            var newSum = sum + (num % decimal);
            var newNum = num / decimal;
            hasPunishment = isPunish(num: newNum, sum: newSum, target: target)
            // if newNum == 8 {
            //     print("newNum: \(newNum), newSum: \(newSum), hasPunish: \(hasPunishment)") 
            // }
            if hasPunishment {
                break;
            }

            count += 1;
        }

        return hasPunishment;
    }
    func punishmentNumber(_ n: Int) -> Int {
        var result = 0;

        for i in 1..<n+1 {
            let squares = i * i;
            if isPunish(num: squares, sum: 0, target: i) {
                print(i)
                result += squares;
            }
        }

        return result;
    }
    
}