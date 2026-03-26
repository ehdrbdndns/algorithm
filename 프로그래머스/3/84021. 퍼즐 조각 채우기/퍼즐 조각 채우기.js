function solution(game_board, table) {
  const n = game_board.length;
  let answer = 0;

  // 상하좌우 이동
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  // 좌표가 보드 범위 안에 있는지 확인
  function inRange(x, y) {
    return x >= 0 && x < n && y >= 0 && y < n;
  }

  /**
   * DFS로 하나의 도형(연결 요소)을 추출
   * - board에서 target 값(0 또는 1)으로 연결된 칸들을 모두 찾는다.
   * - coords에 해당 도형의 좌표들을 담는다.
   */
  function dfs(board, x, y, target, visited, coords) {
    visited[x][y] = true;
    coords.push([x, y]);

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (!inRange(nx, ny)) continue;
      if (visited[nx][ny]) continue;
      if (board[nx][ny] !== target) continue;

      dfs(board, nx, ny, target, visited, coords);
    }
  }

  /**
   * 도형 정규화
   * - 같은 모양이어도 시작 좌표가 다를 수 있으므로
   *   가장 작은 x, y를 기준으로 (0,0) 부근으로 끌어온다.
   * - 이후 좌표 정렬까지 해줘야 완전히 같은 도형을 안정적으로 비교 가능하다.
   *
   * 예:
   * [[3,4],[3,5],[4,4]] -> [[0,0],[0,1],[1,0]]
   */
  function normalize(coords) {
    const minX = Math.min(...coords.map(([x]) => x));
    const minY = Math.min(...coords.map(([, y]) => y));

    const normalized = coords.map(([x, y]) => [x - minX, y - minY]);

    normalized.sort((a, b) => {
      if (a[0] === b[0]) return a[1] - b[1];
      return a[0] - b[0];
    });

    return normalized;
  }

  /**
   * 도형 90도 회전
   * (x, y) -> (y, -x)
   *
   * 회전 후 좌표에 음수가 생길 수 있으므로
   * 비교 전에는 반드시 normalize를 다시 해줘야 한다.
   */
  function rotate(coords) {
    return coords.map(([x, y]) => [y, -x]);
  }

  /**
   * 두 도형이 완전히 같은지 비교
   * - 길이가 다르면 false
   * - 정규화/정렬된 좌표 배열을 한 칸씩 비교
   */
  function isSameShape(a, b) {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
      if (a[i][0] !== b[i][0] || a[i][1] !== b[i][1]) {
        return false;
      }
    }

    return true;
  }

  /**
   * 보드에서 target(0 또는 1)인 모든 도형들을 추출
   * - game_board에서는 0(빈칸) 도형 추출
   * - table에서는 1(블록) 도형 추출
   */
  function extractShapes(board, target) {
    const visited = Array.from({ length: n }, () => Array(n).fill(false));
    const shapes = [];

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (visited[i][j]) continue;
        if (board[i][j] !== target) continue;

        const coords = [];
        dfs(board, i, j, target, visited, coords);

        // 추출한 도형은 바로 정규화해서 저장
        shapes.push(normalize(coords));
      }
    }

    return shapes;
  }

  // game_board에서 빈칸 도형들 추출
  const emptySpaces = extractShapes(game_board, 0);

  // table에서 블록 도형들 추출
  const blocks = extractShapes(table, 1);

  // 각 블록이 이미 사용되었는지 체크
  const used = Array(blocks.length).fill(false);

  /**
   * 빈칸 도형 하나씩 보면서
   * 아직 사용하지 않은 블록 중 같은 모양이 있는지 찾는다.
   *
   * 블록은 최대 4번 회전 가능.
   * 뒤집기는 불가능하므로 회전만 비교한다.
   */
  for (const empty of emptySpaces) {
    for (let i = 0; i < blocks.length; i++) {
      if (used[i]) continue;
      if (blocks[i].length !== empty.length) continue; // 칸 수 다르면 바로 탈락

      let current = blocks[i];
      let matched = false;

      for (let r = 0; r < 4; r++) {
        current = normalize(current);

        if (isSameShape(empty, current)) {
          matched = true;
          break;
        }

        current = rotate(current);
      }

      // 맞는 블록을 찾았으면 사용 처리하고, 채운 칸 수 누적
      if (matched) {
        used[i] = true;
        answer += empty.length;
        break;
      }
    }
  }

  return answer;
}