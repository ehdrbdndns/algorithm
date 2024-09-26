let N = 0;
let queenLocations = [];

/**
 * @param {number} n
 * @return {number}
 */
var totalNQueens = function (n) {
  N = n;
  queenLocations = [];

  const count = backtrace_nqueen(0, 0);

  return count;
};

const backtrace_nqueen = (row, count) => {
  for (let col = 0; col < N; col++) {
    if (is_not_under_attack(row, col)) {
      place_queen(row, col);

      if (row + 1 === N) {
        count += 1;
      } else {
        count = backtrace_nqueen(row + 1, count);
      }

      remove_queen(row, col);
    }
  }

  return count;
}

const is_not_under_attack = (row, col) => {
  for (let i = 0; i < queenLocations.length; i++) {
    const { q_row, q_col } = queenLocations[i];

    // row
    if (q_col === col) {
      return false;
    }

    // col
    if (q_row === row) {
      return false;
    }

    // near
    if (
      (q_col - 1) <= col
      && col <= (q_col + 1)
      && (q_row - 1) <= row
      && row <= (q_row + 1)
    ) {
      return false;
    }

    // dear
    const diff = q_row - row;
    if (
      (q_col - diff) === col
      || (q_col + diff) === col
    ) {
      return false;
    }
  }

  return true;
}

const place_queen = (row, col) => {
  queenLocations.push({ q_row: row, q_col: col });
}

const remove_queen = (row, col) => {
  queenLocations.pop();
}