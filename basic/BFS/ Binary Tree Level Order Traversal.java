/**
 * Definition of TreeNode:
 * public class TreeNode {
 *     public int val;
 *     public TreeNode left, right;
 *     public TreeNode(int val) {
 *         this.val = val;
 *         this.left = this.right = null;
 *     }
 * }
 */

public class Solution {
  /**
   * @param root: A Tree
   * @return: Level order a list of lists of integer
   */
  public List<List<Integer>> levelOrder(TreeNode root) {
      // write your code here
      List<List<Integer>> ret = new ArrayList<List<Integer>>();
      if (root == null) {
          return ret;
      }
      
      Queue<TreeNode> queue = new LinkedList<TreeNode>();
      queue.offer(root);
      while (!queue.isEmpty()) {
          List<Integer> level = new ArrayList<Integer>();
          int size = queue.size();
          while (size > 0) {
              TreeNode node = queue.poll();
              level.add(node.val);
              if (node.left != null) {
                  queue.offer(node.left);
              }
              
              if (node.right != null) {
                  queue.offer(node.right);
              }
              
              size--;
          }
          
          ret.add(level);
      }
      
      return ret;
  }
}