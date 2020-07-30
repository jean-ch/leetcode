/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function(triangle) {
  if (!triangle || !triangle[0]) {
      return 0;
  }
  let m = triangle.length;
  let n = triangle[0].length;
  let dp = new Array(m).fill([]).map(e => new Array(n));
  dp[0][0] = triangle[0][0];
  for (let i = 1; i < m; i++) {
      for (let j = 0; j <= i; j++) {
          if (j == 0) {
              dp[i][j] = dp[i - 1][j];
          } else if (j == i) {
              dp[i][j] = dp[i - 1][j - 1];
          } else {
              dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1]);
          }
          dp[i][j] += triangle[i][j];
      }
  }

  return Math.min(...dp[m - 1]);
};

/**
 * 用滚动数组优化： dp[i] 的状态只和 dp[i - 1] 无关， 因此只需要用一个一个长度为 2 的数组，用奇偶来保存状态即可
 */

var minimumTotal = function(triangle) {
  if (!triangle || !triangle[0]) {
      return 0;
  }
  let m = triangle.length;
  let n = triangle[0].length;
  let dp = new Array(2).fill([]).map(e => new Array(n));
  dp[0][0] = triangle[0][0];
  for (let i = 1; i < m; i++) {
      for (let j = 0; j <= i; j++) {
          if (j == 0) {
              dp[i % 2][j] = dp[(i - 1) % 2][j];
          } else if (j == i) {
              dp[i % 2][j] = dp[(i - 1) % 2][j - 1];
          } else {
              dp[i % 2][j] = Math.min(dp[(i - 1) % 2][j], dp[(i - 1) % 2][j - 1]);
          }
          dp[i % 2][j] += triangle[i][j];
      }
  }

  return Math.min(...dp[(m - 1) % 2]);
};

/**
 * 进一步优化，dp[j] 的状态只和 上一行的 dp[j] 和 dp[j - 1] 有关，即 j 之前的状态有关
 * 因此如果从 i 到 0 反向遍历 j，j 之前的状态还没有被更新，即被记录着，由此可以把二维数组空间进一步优化成一维
 */
/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function(triangle) {
  if (!triangle || !triangle[0]) {
      return 0;
  }
  let m = triangle.length;
  let n = triangle[0].length;
  let dp = new Array(n);
  dp[0] = triangle[0][0];
  for (let i = 1; i < m; i++) {
      for (let j = i; j >= 0; j--) {
          if (j == 0) {
              dp[j] = dp[j];
          } else if (j == i) {
              dp[j] = dp[j - 1];
          } else {
              dp[j] = Math.min(dp[j], dp[j - 1]);
          }
          dp[j] += triangle[i][j];
      }
  }

  return Math.min(...dp);
};