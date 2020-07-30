/**
 * @param {number[]} time
 * @param {number} m
 * @return {number}
 */


 // 这题本来用 dp 解没有通过，换成二叉复杂度从 O(m * n) 变成了 O(log(m + n))， 挺有意思的
var minTime = function(time, m) {
  let left = 0;
  let right = time.reduce((prev, cur) => prev + cur, 0) - Math.max(...time);
  while (left < right) {
      let mid = parseInt((left + right) / 2);
      if (check(mid, time, m)) {
          right = mid;
      } else {
          left = mid + 1;
      }
  }

  return left;
};

// 能否一天最多花 limit 的时间完成刷题
function check(limit, time, m) {
  let max = 0;
  let sum = 0;
  let day = 0;
  for (let t of time) {
      sum += t;
      max = Math.max(max, t);
      if (sum - max > limit) {
          sum = t;
          max = t;
          day++;
      }

      if (day >= m) {
          return false;
      }
  }

  return true;
}