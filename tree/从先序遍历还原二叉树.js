/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {string} S
 * @return {TreeNode}
 */
var recoverFromPreorder = function(S) {
    return findRoot(S, 0, S.length - 1);
};

/**
 * @param {string} A
 * @param {int} start
 * @param {int} end
 * @return {TreeNode} root 
 */

// 注意：数字可能有多位的！
// 注意：js 数字 + 字符串会转换成字符串相加，故应写成 num = num * 10 + parseInt(S[left++]);
function findRoot(S, start, end) {
    if (start < 0 || end >= S.length || start > end) {
        return null;
    }

    let left = start;
    let num = 0;
    while (left <= end && S[left] != '-') {
        num = num * 10 + parseInt(S[left++]);
    }

    let root = new TreeNode(num);

    let level = 0;
    while (left <= end && S[left] === '-') {
        level++;
        left++;
    }

    if (left > end) {
        return root;
    }
    
    let right = left + 1;
    let count = 0;
    while (right <= end) {
        if (S[right] === '-') {
            count++;
            right++;
        } else {
            if (count === level) {
                break;
            } else {
                count = 0;
                right++;
            }
        }
    }

    if (right > end) {
        root.left = findRoot(S, left, end);
        return root;
    }

    root.left = findRoot(S, left, right - level - 1);
    root.right = findRoot(S, right, end);
    return root;
}