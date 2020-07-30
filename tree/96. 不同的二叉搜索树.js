/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function(n) {
  let dp = new Array(n + 1).fill([]).map(e => new Array(n + 1).fill(0));
  dp.forEach((e, i) => e[i] = Math.min(i, 1));

  for (let k = 1; k <= n; k++) { // 长度
      for (let i = 1; i + k <= n; i++) { // 起点
          for (let r = i; r <= i + k; r++) { // root
              dp[i][i + k] += (i <= r - 1 ? dp[i][r - 1] : 1) * (r + 1 <= i + k ? dp[r + 1][i + k] : 1);
          }
      }
  }

  return dp[1][n];
};