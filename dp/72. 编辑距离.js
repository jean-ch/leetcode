/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */

/*
声明二维数组：let dp = new Array(len1 + 1).fill([]).map(e => new Array(len2 + 1));
注意：new Array(len1 + 1).fill([]) 为啥不行呢，fill 的参数如果是object的话，传的是内存地址ß
*/

var minDistance = function(word1, word2) {
    if (!word1 && !word2) {
        return 0;
    }

    if (!word1 || !word2) {
        return word1 ? word1.length : word2.length;
    }

    let len1 = word1.length;
    let len2 = word2.length;
    let dp = new Array(len1 + 1).fill([]).map(e => new Array(len2 + 1));
    for (let i = 0; i <= len1; i++) {
        for (let j = 0; j<= len2; j++) {
            if (i === 0) {
                dp[i][j] = j;
            } else if (j === 0) {
                dp[i][j] = i;
            } else {
                dp[i][j] = Number.MAX_VALUE;
            }
        }
    }
    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            }

            dp[i][j] = Math.min(dp[i][j], dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + 1);
        }
    }

    return dp[len1][len2];
};