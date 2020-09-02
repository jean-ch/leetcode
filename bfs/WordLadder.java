public class Solution {
  /*
   * @param start: a string
   * @param end: a string
   * @param dict: a set of string
   * @return: An integer
   */

   /**
    * 复杂度：O(nm)- n: start.length(), m: dict.size()
    */
  public int ladderLength(String start, String end, Set<String> dict) {
      // write your code here
      dict.add(end);
      int count = 1;
      Queue<String> queue = new LinkedList<String>();
      queue.offer(start);
      Set<String> visited = new HashSet<String>();
      visited.add(start);
      while (!queue.isEmpty()) {
          count++;
          int size = queue.size();
          while (size > 0) {
              String current = queue.poll();
              for (String s : dict) {
                  if (isConvertable(s, current) && !visited.contains(s)) {
                      if (s.equals(end)) {
                          return count;
                      }
                      
                      queue.offer(s);
                      visited.add(s);
                  }
              }
              
              size--;
          }
      }
      
      return Integer.MAX_VALUE;
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