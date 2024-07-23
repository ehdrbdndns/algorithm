/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function (rowIndex) {
  return recursion([], 0, rowIndex)
};

function recursion(array, cur, target) {
  // make new array
  const newArray = [];
  for (let i = 0; i <= cur; i++) {
    if (i === 0 || i === cur) {
      newArray.push(1);
      continue;
    }

    newArray.push(array[i] + array[i - 1]);
  }

  // return state
  if (cur === target) {
    return newArray;
  }

  // travle
  return recursion(newArray, cur + 1, target);
}