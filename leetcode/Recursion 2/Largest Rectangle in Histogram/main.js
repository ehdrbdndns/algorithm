/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  const [result, _1, _2] = divideAndConqure(heights);

  return result;
};

/**
* @param {number[]} heights
*/
const divideAndConqure = (heights) => {
  if (heights.length === 1) {
    // [largestArea, commonHeight, commonCount]
    return [heights[0], heights[0], 1];
  }

  // 왼쪽 오른쪽으로 나눔
  const leftHeights = heights.slice(0, heights.length / 2);
  const rightHeights = heights.slice(heights.length / 2, heights.length);

  // 공통 높이와 가장 큰 area 값을 구함
  const [leftLargestArea, leftCommonHeight, leftCommonCount] = leftHeights;
  const [rightLargestArea, rightCommonHeight, rightCommonCount] = rightHeights;

  // 융합
  let commonHeight = 0;
  let commonCount = 0;
  let commonArea = 0;
  let largestArea = leftLargestArea > rightLargestArea ? leftLargestArea : rightLargestArea;

  if (leftCommonHeight < rightCommonHeight) {
    commonHeight = leftCommonHeight;
    commonCount = leftCommonCount + 1;
  } else if (leftCommonHeight > rightCommonHeight) {
    commonHeight = rightCommonHeight;
    commonCount = rightCommonHeight + 1;
  } else {
    commonHeight = rightCommonHeight;
    commonCount = rightCommonCount + leftCommonCount;
  }

  commonArea = commonHeight * commonCount;
  largestArea = commonArea > largestArea ? commonArea : largestArea;

  return [largestArea, commonHeight, commonCount];
}