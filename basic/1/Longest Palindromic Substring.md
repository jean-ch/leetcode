### Description
Given a string S, find the longest palindromic substring in S. You may assume that the maximum length of S is 1000, and there exists one unique longest palindromic substring.
### Example
Input:"abcdzdcab"  
Output:"cdzdc"  
Input:"aba"  
Output:"aba"  
### Solution
1. 枚举中心点
    - 回文 -> 按中心点对称
    - 每个中心点，分字符串长度为奇和为偶分别讨论
    - 复杂度: 时间 O(n^2), 空间 O(1)
    ```
    public class Solution {
        /**
        * @param s: input string
        * @return: a string as the longest palindromic substring
        */
        public String longestPalindrome(String s) {
            // write your code here
            if (s == null || s.length() == 0) {
                return s;
            }
        
            String str = "";
            int n = s.length();
            for (int center = 0; center < n; center++) {
                // 奇数长度的情况
                for (int start = center, end = center; valid(start, end, n); start--, end++) {
                    if (s.charAt(start) != s.charAt(end)) {
                        break;
                    }
                
                    str = updateString(start, end, str, s);
                }
                
                // 偶数长度的情况
                for (int start = center, end = center + 1; valid(start, end, n); start--, end++) {
                    if (s.charAt(start) != s.charAt(end)) {
                        break;
                    }
                    
                    str = updateString(start, end, str, s);
                }
            }
            
            return str;
        }
        
        private String updateString(int start, int end, String str, String s) {
            if (end - start + 1 > str.length()) {
                str = s.substring(start, end + 1);
            }
            
            return str;
        }
        
        private boolean valid(int start, int end, int n) {
            return start >= 0 && end < n;
        }
    }
    ```
2. dp，比对头尾字符
    - boolean array 记录 isPalindrome
    - 状态方程：  
    ```if (s.charAt(i) == s.charAt(j) && dp[i + 1][j - 1])) dp[i][j] = true;```
    - 初始状态：  
    ```if ((i == j) || (j == i + 1 && s.charAt(i) == s.charAt(j))) dp[i][j] = true;```
    - 复杂度： 时间 O(n^2), 空间 O(n^2)
    ```
    public class Solution {
        /**
        * @param s: input string
        * @return: a string as the longest palindromic substring
        */
        public String longestPalindrome(String s) {
            // write your code here
            if (s == null || s.length() == 0) {
                return s;
            }
            
            int n = s.length();
            boolean[][] dp = new boolean[n][n];
            int max = 1;
            String str = s.substring(0, 1);
            for (int len = 0; len < n; len++) {
                for (int i = 0; i < n - len; i++) {
                    int j = i + len;
                    if (i == j) {
                        dp[i][j] = true;
                    } else if (s.charAt(i) == s.charAt(j) && (j == i + 1 || dp[i + 1][j - 1])) {
                        dp[i][j] = true;
                        if (j - i + 1 > max) {
                            max = j - i + 1;
                            str = s.substring(i, j + 1);
                        }
                    }
                }
            }
            
            return str;
        }
    }
    ```
3. 