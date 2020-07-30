/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */

/**
 * 解题思路：https://leetcode-cn.com/problems/binary-tree-inorder-traversal/solution/yan-se-biao-ji-fa-yi-chong-tong-yong-qie-jian-ming/
 * Stack: 把已经遍历过 left, right 的节点标记一下，如果已经遍历过，则直接取值，反之遍历它的 left, right 装回 Stack
 * 装进 Stack 的顺序和二叉树的遍历顺序相反
 * 二叉树的遍历都可以用这种方法，只是装进 Stack 的顺序有区别
 */
public class Node {
    TreeNode node;
    boolean visited;

    Node(TreeNode node, boolean visited) {
        this.node = node;
        this.visited = visited;
    }
}

// left- in-right
// Stack: pop(), push(), peek(), size(), empty()
// ArrayList: add(), remove(), isEmpty()
class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> list = new ArrayList<Integer>();
        if (root == null) {
            return list;
        }

        Stack<Node> nodes = new Stack<Node>();
        nodes.push(new Node(root, false));
        while (nodes.size() > 0) {
            Node current = nodes.pop();
            if (current.visited) {
                list.add(current.node.val);
            } else {
                if (current.node.right != null) {
                    nodes.push(new Node(current.node.right, false));
                }

                current.visited = true;
                nodes.push(current);

                if (current.node.left != null) {
                    nodes.push(new Node(current.node.left, false));
                }
            }
        }

        return list;
    }
    
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> list = new ArrayList<Integer>();
        if (root == null) {
            return list;
        }

        Stack<Node> nodes = new Stack<Node>();
        nodes.push(new Node(root, false));
        while (!nodes.empty()) {
            Node current = nodes.pop();
            if (current.visited) {
                list.add(current.node.val);
            } else {
                current.visited = true;
                if (current.node.right != null) {
                    nodes.push(new Node(current.node.right, false));
                }

                if (current.node.left != null) {
                    nodes.push(new Node(current.node.left, false));
                }

                nodes.push(current);
            }
        }

        return list;
    }
}