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
  * 思路：
  * 对于二叉树的规律问题，想到二叉树的前序遍历得到的是一个升序的数组
  * 在 in-order-traverdal 得到的升序数组中找到 2 个放置错的数： 
  *     有一对降序，返回这对降序
  *     有两对降序，返回第一对的前和第二对的后
  * 遍历原二叉树，找到放置错的数，改变它的 value
  */
public class Node {
    TreeNode node;
    boolean visited;
    Node(TreeNode node, boolean visited) {
        this.node = node;
        this.visited = visited;
    }
} 
class Solution {
    public void recoverTree(TreeNode root) {
        List<TreeNode> nodes = inorderTraversal(root);
        int[] indices = findSwap(nodes);
        swapAndRecover(root, 2, indices[0], indices[1]);
    }

    public List<TreeNode> inorderTraversal(TreeNode root) {
        List<TreeNode> nodes = new ArrayList<TreeNode>();
        if (root == null) {
            return nodes;
        }

        Stack<Node> stack = new Stack<Node>();
        stack.push(new Node(root, false));
        while (!stack.empty()) {
            Node current = stack.pop();
            if (current.visited) {
                nodes.add(current.node);
            } else {
                if (current.node.right != null) {
                    stack.push(new Node(current.node.right, false));
                }
                
                current.visited = true;
                stack.push(current);

                if (current.node.left != null) {
                    stack.push(new Node(current.node.left, false));
                }
            }
        }

        return nodes;
    }

    public int[] findSwap(List<TreeNode> nodes) {
        int val1 = -1;
        int val2 = -1;
        

        for (int i = 0; i < nodes.size() - 1; i++) {
            // 如果有 2 个降序对，取第一对的前和第二对的后
            // 如果有 1 个降序对，取这一对即可
            // 因此更新 val2， val1 只取第一对
            if (nodes.get(i).val >= nodes.get(i + 1).val) {
                val2 = nodes.get(i + 1).val;
                if (val1 == -1) {
                    val1 = nodes.get(i).val;
                }
            }
        }

        return new int[]{val1, val2};
    }

    // 把 count 传进去可以减少一部分多余的遍历
    public void swapAndRecover(TreeNode root, int count, int val1, int val2) {
        if (root == null || count <= 0) {
            return;
        }

        if (root.val == val1 || root.val == val2) {
            root.val = root.val == val1 ? val2 : val1;
            if (--count == 0) {
                return;
            }
        }

        swapAndRecover(root.left, count, val1, val2);
        swapAndRecover(root.right, count, val1, val2);
    } 
}