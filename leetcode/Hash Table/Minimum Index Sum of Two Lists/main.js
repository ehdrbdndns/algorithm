/**
 * @param {string[]} list1
 * @param {string[]} list2
 * @return {string[]}
 */
var findRestaurant = function (list1, list2) {
  // 조건
  // list1과 list2에 공통적으로 존재하는 string이여야 함
  // 서로 발견한 값의 인덱스 합이 최소 합임
  const map = new Map();
  const result = new Map();
  let leastIndex = 2001;
  for (let i = 0; i < list1.length; i++) {
    map.set(list1[i], i);
  }

  for (let i = 0; i < list2.length; i++) {
    if (map.has(list2[i])) {
      const sumOfIndex = map.get(list2[i]) + i;

      if (leastIndex >= sumOfIndex) {
        if (!result.has(sumOfIndex)) {
          result.set(sumOfIndex, [list2[i]]);
        } else {
          const array = result.get(sumOfIndex);
          array.push(list2[i]);
          result.set(sumOfIndex, array);
        }

        leastIndex = sumOfIndex;
      }
    }
  }

  return result.get(leastIndex);
};