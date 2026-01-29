/**
 * @param {string} source
 * @param {string} target
 * @param {character[]} original
 * @param {character[]} changed
 * @param {number[]} cost
 * @return {number}
 */
var minimumCost = function (source, target, original, changed, cost) {
  const INF = Number.MAX_SAFE_INTEGER; // 충분히 큰 값
  const N = 26;

  // dist[a][b] = a -> b 최소 비용
  const dist = Array.from({ length: N }, () => Array(N).fill(INF));
  for (let i = 0; i < N; i++) dist[i][i] = 0;

  // 같은 (u,v) 변환이 여러 번 나오면 최소 비용만 유지
  for (let i = 0; i < cost.length; i++) {
    const u = original[i].charCodeAt(0) - 97;
    const v = changed[i].charCodeAt(0) - 97;
    dist[u][v] = Math.min(dist[u][v], cost[i]);
  }

  // Floyd–Warshall
  for (let k = 0; k < N; k++) {
    for (let i = 0; i < N; i++) {
      if (dist[i][k] === INF) continue;
      for (let j = 0; j < N; j++) {
        if (dist[k][j] === INF) continue;
        const nd = dist[i][k] + dist[k][j];
        if (nd < dist[i][j]) dist[i][j] = nd;
      }
    }
  }

  // source -> target 비용 합산
  let ans = 0;
  for (let i = 0; i < source.length; i++) {
    const s = source.charCodeAt(i) - 97;
    const t = target.charCodeAt(i) - 97;
    if (s === t) continue;
    if (dist[s][t] === INF) return -1;
    ans += dist[s][t];
  }

  return ans;
};
