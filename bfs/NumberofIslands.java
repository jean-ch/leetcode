public class Solution {
  /**
   * @param grid: a boolean 2D matrix
   * @return: an integer
   */

  /**
   * 对每个为 1 的 node dfs，把相连的 1 变成 0
   */
   
  class Coordinate {
    int x, y;
    public Coordinate(int x, int y) {
      this.x = x;
      this.y = y;
    }
  }
  
  public int numIslands(boolean[][] grid) {
    // write your code here
    if (grid == null || grid.length == 0 || grid[0] == null || grid[0].length == 0) {
      return 0;
    }
    
    int m = grid.length;
    int n = grid[0].length;
    int count = 0;
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        if (grid[i][j]) {
          count++;
          dfs(new Coordinate(i, j), grid);
        }
      }
    }
    
    return count;
  }
  
  int[][] directions = new int[][]{{0, -1}, {0, 1}, {-1, 0}, {1, 0}};
  
  private void dfs(Coordinate node, boolean[][] grid) {
    Queue<Coordinate> queue = new LinkedList<Coordinate>();
    queue.offer(node);
    grid[node.x][node.y] = false;
    while (!queue.isEmpty()) {
      Coordinate cur =  queue.poll();
      for (int[] dir : directions) {
        Coordinate next = new Coordinate(cur.x + dir[0], cur.y + dir[1]);
        if (outRange(next, grid)) {
          continue;
        }
        
        if (grid[next.x][next.y]) {
          queue.offer(next);
          grid[next.x][next.y] = false;
        }
      }
    }
    
  }
  
  private boolean outRange(Coordinate cor, boolean[][] grid) {
    int m = grid.length;
    int n = grid[0].length;
    if (cor.x < 0 || cor.x >= m || cor.y < 0 || cor.y >= n) {
      return true;
    }
    
    return false;
  }
}