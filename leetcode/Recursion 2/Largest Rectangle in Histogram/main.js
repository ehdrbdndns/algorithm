/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  recursive(heights);
};

const recursive = (heights) => {
  // base case
  if (heights.length === 1) {
    console.log(heights[0])
    return { area: [heights[0]], histogram: [heights[0]] }
  }

  const left = recursive(heights.slice(0, heights.length / 2));
  const right = recursive(heights.slice(heights.length / 2, heights.length));

  const commonHeight = Math.min(left.histogram[left.histogram.length - 1], right.histogram[right.histogram.length - 1]);

  // common Height에 대한 최적화 가능

  // commonHeight과 left와 right의 histogram에 있는 heights을 계산해 commonArea를 구함
  const totalHistogramLegth = left.histogram.length + right.histogram.length - 2;
  for (let i = 0; i <= totalHistogramLegth; i++) {
    // pos
    const isRightPos = i > (totalHistogramLegth / 2) ? true : false;
    const histogram = isRightPos ? right.histogram : left.histogram;
    const index = isRightPos ? i - (totalHistogramLegth / 2) - 1 : i;


  }
}