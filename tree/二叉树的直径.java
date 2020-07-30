/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */

// 最长子路径不一定经过 root 节点
// Java Math.max 直接收款 2 个参数

public class Tuple {
    int depth;
    int diameter;
    Tuple(int depth, int diameter) {
        this.depth = depth;
        this.diameter = diameter;
    }
}

class Solution {
    public int diameterOfBinaryTree(TreeNode root) {
        return traverse(root).diameter;       
    }

    public Tuple traverse(TreeNode node) {
        if (node == null) {
            return new Tuple(0, 0);
        }

        if (node.left == null && node.right == null) {
            return new Tuple(1, 0);
        }

        Tuple left = traverse(node.left);
        Tuple right = traverse(node.right);
        int depth = Math.max(left.depth, right.depth) + 1;
        int diameter = Math.max(Math.max(left.diameter, right.diameter), left.depth + right.depth);
        return new Tuple(depth, diameter);
    }
}