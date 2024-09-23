/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  const m = matrix.length;
  const n = matrix[0].length;

  const result = hasTarget(matrix, 0, m - 1, 0, n - 1, target);

  return result;
};

const hasTarget = (matrix, top, bottom, left, right, target) => {

  // get middle point of matrix
  let middleX = Math.ceil((right - left) / 2) + left;
  let middleY = Math.ceil((bottom - top) / 2) + top;

  console.log(top, bottom, left, right)
  console.log(middleY, middleX)
  console.log("----")

  // check edge
  if (middleX < 0 || middleX >= matrix[0].length
    || middleY < 0 || middleY >= matrix.length) {
    return false;
  }

  // check target
  if (matrix[middleY][middleX] === target) {
    return true;
  }

  // divide sub problem
  if (matrix[middleY][middleX] > target) {
    if (middleY === bottom && middleX === right) {
      return false;
    }

    // discard bottom-right matrix
    let newBottom = middleY;
    let newRight = middleX;

    return hasTarget(matrix, top, newBottom, left, newRight, target);
  } else { // matrix[middleY][middleX] < target
    if (middleY === top && middleX === left) {
      return false;
    }
    // discard top-left matrix
    let newTop = middleY;
    let newLeft = middleX;
    return hasTarget(matrix, newTop, bottom, newLeft, right, target);
  }
}