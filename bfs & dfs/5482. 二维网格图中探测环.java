// dfs + visited
class Solution {
  int[][] ds = new int[][]{{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
  public boolean containsCycle(char[][] grid) {
      int m = grid.length;
      int n = grid[0].length;
      boolean[][] visited = new boolean[m][n];
      for (int i = 0; i < m; i++) {
          for (int j = 0; j < n; j++) {
              if (visited[i][j]) {ß
                  continue;
              }

              if (dfs(i, j, -1, -1, grid[i][j], grid, visited)) {
                  return true;
              }
          }
      }
      
      return false;
  }

  public boolean dfs(int x, int y, int prevx, int prevy, char value, char[][] grid, boolean[][] visited) {
      int m = grid.length;
      int n = grid[0].length;
      if (x < 0 || x >= m || y < 0 || y >= n || grid[x][y] != value) {
          return false;
      }

      if (visited[x][y]) {
          return true;
      }

      visited[x][y] = true;

      for (int[] d : ds) {
          int nextx = d[0] + x;
          int nexty = d[1] + y;
          if (nextx == prevx && nexty == prevy) {
              continue;
          }

          if (dfs(nextx, nexty, x, y, value, grid, visited)) {
              return true;
          }
      }

      return false;
  }
}