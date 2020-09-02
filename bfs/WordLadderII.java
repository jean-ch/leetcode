public class Solution {
    /*
     * @param start: a string
     * @param end: a string
     * @param dict: a set of string
     * @return: a list of lists of string
     */

     /**
      * bfs 找到最短路径需要的步数， dfs 找到所有的最短路径
      * bfs 的时候 cache
      *     1. neighbors map，节省 dfs 的时候再次找 neighbors 的时间
      *     2. distance map 用于剪枝，dfs 的时候可以直接通过 distance 的关系走最短路径，不用每个 next 都遍历到
      */
    public List<List<String>> findLadders(String start, String end, Set<String> dict) {
        // write your code here
        Map<String, Integer> distance = new HashMap<String, Integer>();
        Map<String, List<String>> neighbors = new HashMap<String, List<String>>();
        bfs(start, end, dict, distance, neighbors);
        
        List<List<String>> ret = new ArrayList<List<String>>();
        List<String> path = new ArrayList<String>();
        path.add(start);
        dfs(start, end, distance, neighbors, path, ret);
        return ret;
    }
    
    private void dfs(String str, String end, Map<String, Integer> distance, Map<String, List<String>> neighbors, List<String> path, List<List<String>> ret) {
        if (path.size() == distance.get(end)) {
          if (str.equals(end)) {
            ret.add(new ArrayList<String>(path));
          }
          
          return;
        }
        
        List<String> next = neighbors.get(str);
        for (String s : next) {
          if (distance.get(s) == distance.get(str) + 1) {
            path.add(s);
            dfs(s, end, distance, neighbors, path, ret);
            path.remove(path.size() - 1);
          }
        }
    }
    
    private void bfs(String start, String end, Set<String> dict, Map<String, Integer> distance, Map<String, List<String>> neighbors) {
      // write your code here
      dict.add(start);
      dict.add(end);
      int count = 1;
      distance.put(start, count);
      for (String s : dict) {
          neighbors.put(s, new ArrayList<String>());
      }
      
      Queue<String> queue = new LinkedList<String>();
      queue.offer(start);
      while (!queue.isEmpty()) {
          count++;
          int size = queue.size();
          while (size > 0) {
              String current = queue.poll();
              List<String> next = findNeighbors(current, dict);
              for (String s : next) {
                neighbors.get(current).add(s);
                if (!distance.containsKey(s)) {
                    distance.put(s, count);
                    queue.offer(s);
                }
              }
              
              size--;
          }
      }
  }
  
  private List<String> findNeighbors(String a, Set<String> dict) {
      List<String> ret = new ArrayList<String>();
      for (String str : dict) {
          if (isConvertable(a, str)) {
              ret.add(str);
          }
      }
      
      return ret;
  }
  
  private boolean isConvertable(String a, String b) {
      if (a.length() != b.length()) {
          return false;
      }
      
      int count = 0;
      for (int i = 0; i < a.length(); i++) {
          if (a.charAt(i) != b.charAt(i)) {
              if (++count == 2) {
                  return false;
              }
          }
      }
      
      return count == 1;
  }
}