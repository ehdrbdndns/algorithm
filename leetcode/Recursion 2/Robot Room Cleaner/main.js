/**
 * // This is the robot's control interface.
 * // You should not implement it, or speculate about its implementation
 * function Robot() {
 *     // Returns true if the cell in front is open and robot moves into the cell.
 *     // Returns false if the cell in front is blocked and robot stays in the current cell.
 *     @return {boolean}
 *     this.move = function() {
 *         ...
 *     };
 *
 *     // Robot will stay in the same cell after calling turnLeft/turnRight.
 *     // Each turn will be 90 degrees.
 *     @return {void}
 *     this.turnLeft = function() {
 *         ...
 *     };
 * 
 *     // Robot will stay in the same cell after calling turnLeft/turnRight.
 *     // Each turn will be 90 degrees.
 *     @return {void} 
 *     this.turnRight = function() {
 *         ...
 *     };
 *
 *     // Clean the current cell.
 *     @return {void}
 *     this.clean = function() {
 *         ...
 *     };
 * };
 */

let visitedSet = new Set();
/**
 * @param {Robot} robot
 * @return {void}
 */
var cleanRoom = function (robot) {
  visitedSet = new Set();
  visitedSet.add('0,0')
  robot.clean();
  backtrack(robot, 0, 0, 0);
};

const backtrack = (robot, row, col, direct) => {
  let nextDirect = direct;
  for (let i = 0; i < 4; i++) {
    const { nextRow, nextCol } = getNextPosition(row, col, nextDirect);

    if (isValid(robot, nextRow, nextCol)) {
      place(robot, nextRow, nextCol);

      backtrack(robot, nextRow, nextCol, nextDirect);

      remove(robot, nextRow, nextCol);
    }

    // turn
    nextDirect = (nextDirect + 1) % 4;
    robot.turnRight();
  }

  nextDirect = (nextDirect - 1) % 4;
  robot.turnLeft();
}

const isValid = (robot, row, col) => {
  // check visitedSet
  if (visitedSet.has(`${row},${col}`)) {
    return false;
  }

  // check wall
  return robot.move();
}

const place = (robot, row, col) => {
  visitedSet.add(`${row},${col}`);
  robot.clean();
}

const remove = (robot, row, col) => {
  robot.turnLeft();
  robot.move();
  robot.turnRight();
  robot.turnRight();
}

const getNextPosition = (row, col, nextDirect) => {
  let nextRow = row;
  let nextCol = col;

  switch (nextDirect) {
    case 0:
      nextRow = row - 1;
      nextCol = col;
      break;
    case 1:
      nextRow = row;
      nextCol = col + 1;
      break;
    case 2:
      nextRow = row + 1;
      nextCol = col
      break;
    case 3:
      nextRow = row;
      nextCol = col - 1;
      break;
    default:
      break;
  }

  return { nextRow, nextCol }
}