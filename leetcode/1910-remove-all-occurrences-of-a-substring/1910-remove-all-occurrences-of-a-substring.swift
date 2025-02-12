class Solution {
  func removeOccurrences(_ s: String, _ part: String) -> String {
    s.reduce(into: "") { result, ch in
      result.append(ch)
      if result.hasSuffix(part) {
        result.removeLast(part.count)
      }
    }
  }
}