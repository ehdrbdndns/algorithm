class Solution {
    func getTileLetterCount(_ charToCount: [Character: Int]) -> Int {
        var count = 1;
        var letters = Array(charToCount.keys);
        
        if charToCount.keys.count == 0 {
            return count;
        }

        for letter in charToCount.keys {
            var newCharToCount = charToCount;
            if newCharToCount[letter]! == 1 {
                newCharToCount.removeValue(forKey: letter);
            } else {
                newCharToCount[letter]! -= 1;
            }
            count += getTileLetterCount(newCharToCount);
        }

        return count;
    }

    func numTilePossibilities(_ tiles: String) -> Int {
        var charToCount: [Character: Int] = [:];

        for c in tiles {
            charToCount[c, default: 0] += 1;
        }

        return getTileLetterCount(charToCount) - 1;
    }
}