const NUMBER_OF_BUCKET = 60000;

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  const set = new Array(NUMBER_OF_BUCKET).fill(null);

  nums.forEach((value) => {
    const key = value < 0 ? Math.abs(value) + (NUMBER_OF_BUCKET / 2)
      : value;

    if (set[key] !== null) {
      set[key] = null;
    } else {
      set[key] = value;
    }
  });

  const result = set.filter((value) => value !== null);

  return result[0];
};