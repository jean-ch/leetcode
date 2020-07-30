/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function(root) {
    return findPathSum(root, 0).reduce((acc, cur) => acc + cur, 0);
};

/**
 * @return {[sum]}
 */
function findPathSum(node, sum) {
    if (node === null) {
        return [sum];
    }

    sum = sum * 10 + node.val;
    if (node.left === null && node.right === null) {
        return [sum];
    }

    let left = findPathSum(node.left, sum);
    let right = findPathSum(node.right, sum);
    if (node.left === null || node.right === null) {
        return node.left === null ? right : left;
    }

    return [...left, ...right];
}