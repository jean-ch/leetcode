/**
 * Definition for Undirected graph.
 * class UndirectedGraphNode {
 *     int label;
 *     List<UndirectedGraphNode> neighbors;
 *     UndirectedGraphNode(int x) {
 *         label = x;
 *         neighbors = new ArrayList<UndirectedGraphNode>();
 *     }
 * }
 */

 /**
  * BFS ob Graph: queue + hashmap
  */

public class Solution {
  /**
   * @param node: A undirected graph node
   * @return: A undirected graph node
   */
  public UndirectedGraphNode cloneGraph(UndirectedGraphNode node) {
      // write your code here
      if (node == null) {
          return node;
      }
      
      UndirectedGraphNode root = new UndirectedGraphNode(node.label);
      Map<Integer, UndirectedGraphNode> map = new HashMap<Integer, UndirectedGraphNode>();
      map.put(root.label, root);
      Queue<UndirectedGraphNode> queue = new LinkedList<UndirectedGraphNode>();
      queue.offer(node);
      while (!queue.isEmpty()) {
          UndirectedGraphNode current = queue.poll();
          UndirectedGraphNode clone = map.get(current.label);
          for (UndirectedGraphNode neighbor : current.neighbors) {
              UndirectedGraphNode cloneNeighbor;
              if (map.containsKey(neighbor.label)) {
                  cloneNeighbor = map.get(neighbor.label);
              } else {
                  cloneNeighbor = new UndirectedGraphNode(neighbor.label);
                  map.put(neighbor.label, cloneNeighbor);
                  queue.offer(neighbor);
              }
              
              clone.neighbors.add(cloneNeighbor);
          }
      }
      
      return root;
  }
}