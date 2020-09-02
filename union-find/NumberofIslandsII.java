/**
 * Definition for a point.
 * class Point {
 *     int x;
 *     int y;
 *     Point() { x = 0; y = 0; }
 *     Point(int a, int b) { x = a; y = b; }
 * }
 */

public class Solution {
  /**
   * @param n: An integer
   * @param m: An integer
   * @param operators: an array of point
   * @return: an integer array
   */
  int[][] directions = new int[][]{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}; 
  
  public List<Integer> numIslands2(int n, int m, Point[] operators) {
      // write your code here
      List<Integer> result = new ArrayList<Integer>();
      if (n < 0 || m < 0 || operators == null || operators.length == 0) {
        return result;
      }
      
      // initialize father
      int[] father = new int[n * m];
      // visited 记录哪些点已经被置为 1 
      Map<Integer, Boolean> visited = new HashMap<Integer, Boolean>();
      
      for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
          father[calc(i, j, n, m)] = calc(i, j, n, m);
          visited.put(calc(i, j, n, m), false);
        }
      }
      
      int count = 0;
      for (Point p : operators) {
        int x = p.x;
        int y = p.y;
        // 如果已经置 1 过了，跳过
        if (visited.get(calc(x, y, n, m))) {
          result.add(count);
          continue;
        }
        
        // 先假设增加了一个岛
        count++; 
        
        // 遍历周围 4 个方向，每连通一个新岛，count - 1
        for (int[] dir : directions) {
          int nx = x + dir[0];
          int ny = y + dir[1];
          
          // 出界，或者不是岛，不用 count - 1
          if (nx < 0 || nx >= n || ny < 0 || ny >= m || !visited.get(calc(nx, ny, n, m))) {
            continue;
          }
          
          // 判断 (x, y) 和 (nx, ny) 是否在一个集合里：(x, y) 之前已经跟其他邻点 merge 了，而 (nx, ny) 和该邻点在同一个集合里
          // 那么此次连通的岛本来就已经连通了，因此不用 count - 1
          if (find(calc(x, y, n, m), father) == find(calc(nx, ny, n, m), father)) {
            continue;
          }
          
          // 把 (x, y) 和 (nx, ny) 放进一个集合里
          union(calc(x, y, n, m), calc(nx, ny, n, m), father);
          count--;
        }
        
        visited.put(calc(x, y, n, m), true);
        result.add(count);
      }
      
      return result;
  }
  
  
  private int find(int value, int[]father) {
    int ancestor = value;
    while (father[ancestor] != ancestor) {
      ancestor = father[ancestor];
    }
    
    while (value != ancestor) {
      int tmp = father[value];
      father[value] = ancestor;
      value = tmp;
    }
    
    return ancestor;
  }
  
  private void union(int a, int b, int[] father) {
    int fa = find(a, father);
    int fb = find(b, father);
    if (fa != fb) {
      father[fa] = fb;
    }
  }
  
  private int calc(int x, int y, int n, int m) {
    return x * m + y;
  }
}