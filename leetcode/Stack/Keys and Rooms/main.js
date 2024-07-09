/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
var canVisitAllRooms = function (rooms) {
  // I can visit 0 room without key
  // I can visit the other rooms with distinct key
  // goal: visit all the rooms with distinct key

  const visit = Array.from({ length: rooms.length }, () => false);
  const stack = [];

  stack.push(rooms[0]);
  visit[0] = true;
  let visitCount = 1;

  while (stack.length) {

    if (visitCount === rooms.length) {
      break;
    }

    const keys = stack.pop();

    for (let key of keys) {
      // check visit
      if (visit[key]) {
        continue;
      }

      // visit
      visit[key] = true;
      visitCount++;

      stack.push(rooms[key])
    }
  }

  // return true if you can visit all the rooms, or false otherwise
  return visitCount === rooms.length
};