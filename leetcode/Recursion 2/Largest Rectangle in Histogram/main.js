/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  const backtracking = (pivotHeight, curIndex, depth, largestArea) => {
    // base case
    if (curIndex === heights.length) {
      return pivotHeight * (depth - 1)
    }

    // base case
    if (pivotHeight > heights[curIndex]) {
      return pivotHeight * (depth - 1)
    }

    let newLargestArea = largestArea;

    const value = backtracking(pivotHeight, curIndex + 1, depth + 1, newLargestArea);
    newLargestArea = value > newLargestArea ? value : newLargestArea;

    for (let h = heights[curIndex]; h >= 0; h--) {
      if (h * (heights.length - curIndex) >= newLargestArea) {
        const value = backtracking(h, curIndex + 1, 2, newLargestArea);
        newLargestArea = value > newLargestArea ? value : newLargestArea;
      } else {
        break;
      }
    }

    return newLargestArea;
  }

  return backtracking(0, 0, 1, 0);
};
