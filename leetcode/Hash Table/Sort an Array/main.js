class MergeSort {

  constructor() {

  }

  divide(arr) {
    // base case
    if (!arr || arr.length === 0) {
      return [];
    }

    if (arr.length === 1) {
      return arr
    }

    // get pivot
    const pivot = Math.floor(arr.length / 2);

    // left
    const leftArr = this.divide(arr.slice(0, pivot));

    // right
    const rightArr = this.divide(arr.slice(pivot));

    // merge
    return this.merge(leftArr, rightArr);
  }

  merge(leftArr, rightArr) {
    let leftIndex = 0;
    let rightIndex = 0;

    let ret = [];

    for (let i = 0; i < leftArr.length + rightArr.length; i++) {

      if (leftIndex >= leftArr.length) {
        const slicedArr = rightArr.slice(rightIndex);
        ret = ret.concat(slicedArr);
        break;
      }

      if (rightIndex >= rightArr.length) {
        const slicedArr = leftArr.slice(leftIndex);
        ret = ret.concat(slicedArr);
        break;
      }

      if (leftArr[leftIndex] > rightArr[rightIndex]) {
        ret.push(rightArr[rightIndex++]);
      } else {
        ret.push(leftArr[leftIndex++]);
      }
    }

    return ret;
  }
}

/**
* @param {number[]} nums
* @return {number[]}
*/
var sortArray = function (nums) {
  const mergeSorter = new MergeSort();
  const result = mergeSorter.divide(nums);
  return result;
};