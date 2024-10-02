/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  const isValid = (pivotHeight, curHeight) => {
    if (pivotHeight > curHeight) {
      return false;
    }

    if (pivotHeight === 0 || curHeight === 0) {
      return false;
    }

    return true;
  }

  const canHasLargestArea = (pivotHeight, curIndex, largestArea) => {
    return (pivotHeight * (heights.length - curIndex)) >= largestArea;
  }

  const backtracking = (pivotHeight, depth, curIndex) => {
    // base case
    if (curIndex >= heights.length) {
      return pivotHeight * depth;
    }

    // i is height
    let largestArea = 0;
    if (isValid(pivotHeight, heights[curIndex])) {
      largestArea = backtracking(pivotHeight, depth + 1, curIndex + 1);
    } else {
      largestArea = pivotHeight * depth;
    }

    for (let i = heights[curIndex]; i >= 0; i--) {
      if (canHasLargestArea(i, curIndex, largestArea)) {
        let area = backtracking(i, 1, curIndex + 1);
        largestArea = area > largestArea ? area : largestArea;
      }
    }

    return largestArea;
  }

  return backtracking(heights[0], 0, 0)
};