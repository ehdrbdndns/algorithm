class Solution {
    func queryResults(_ limit: Int, _ queries: [[Int]]) -> [Int] {
        // limit is range of ball: [0, limit]
        var distinctNumberList: [Int] = [];

        var ballDict: [Int: Int] = [:]; // ball: color
        var colorDict: [Int: Int] = [:]; // color: count

        for query in queries {
            let ball = query[0];
            let color = query[1];

            // check has ball
            if let ballColor = ballDict[ball] {
                if ballColor != color {
                    // check color count
                    if colorDict[ballColor, default: 0] > 0 {
                        colorDict[ballColor, default: 0] -= 1;
                        if colorDict[ballColor, default: 0] == 0 {
                            colorDict.removeValue(forKey: ballColor)
                        }
                    }
                    
                    colorDict[color, default: 0] += 1
                }
            } else {
                colorDict[color, default: 0] += 1
            }

            ballDict[ball] = color;
            distinctNumberList.append(colorDict.keys.count);
        }
        
        return distinctNumberList
    }
}