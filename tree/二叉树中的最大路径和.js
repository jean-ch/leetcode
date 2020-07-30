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

var maxPathSum = function(root) {
    return dfs(root).max;
};

/**
 * @param {TreeNode} root
 * @return {max, singleMax} 
 */
function dfs(root) {
    /**
     * test case: [-3]: 考虑到 root.val 可以为负， 把 empty 子节点的 max 设为最小负值
     * 注意：最小负值： Number.MIN_SAFE_INTEGER
     */
    let empty = {
        singleMax: Number.MIN_SAFE_INTEGER,
        max: Number.MIN_SAFE_INTEGER,
    };

    if (root === null) {
        return empty;
    }

    let left = root.left ? dfs(root.left) : empty;
    let right = root.right ? dfs(root.right) : empty;
    let singleMax = Math.max(root.val, root.val + left.singleMax, root.val + right.singleMax);
    let max = Math.max(left.max, right.max, singleMax, root.val + left.singleMax + right.singleMax);

    return { singleMax, max };
}