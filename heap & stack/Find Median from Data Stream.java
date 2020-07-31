/** 
Numbers keep coming, return the median of numbers at every time a new number added.

样例
Example 1
Input: [1,2,3,4,5]
Output: [1,1,2,2,3]
Explanation:
The medium of [1] and [1,2] is 1.
The medium of [1,2,3] and [1,2,3,4] is 2.
The medium of [1,2,3,4,5] is 3.

Example 2
Input: [4,5,1,3,2,6,0]
Output: [4,4,4,3,3,3,3]
Explanation:
The medium of [4], [4,5], [4,5,1] is 4.
The medium of [4,5,1,3], [4,5,1,3,2], [4,5,1,3,2,6] and [4,5,1,3,2,6,0] is 3.

挑战
Total run time in O(nlogn).

说明
What's the definition of Median?

The median is not equal to median in math.
Median is the number that in the middle of a sorted array. If there are n numbers in a sorted array A, the median is A[(n - 1) / 2]A[(n−1)/2].
For example, if A=[1,2,3], median is 2. If A=[1,19], median is 1.
*/

// PriorityQueue 是个最小堆
// 最大堆： new PriorityQueue<Integer>(n, Collections.reverseOrder());
// offer(), poll(), peak()
public class Solution {
  /**
   * @param nums: A list of integers
   * @return: the median of numbers
   */
  public int[] medianII(int[] nums) {
      // write your code here
      int n = nums.length;
      int[] ret = new int[n];
      
      if (nums.length == 0) {
          return ret;
      }
      
      PriorityQueue<Integer> min = new PriorityQueue<Integer>(n, Collections.reverseOrder());
      PriorityQueue<Integer> max = new PriorityQueue<Integer>(n);
      
      for (int i = 0; i < n; i++) {
          if (max.size() == 0 || nums[i] >= max.peek()) {
              max.offer(nums[i]);
          } else {
              min.offer(nums[i]);
          }
          
          ret[i] = findMedium(min, max);
      }
      
      return ret;
  }
  
  public int findMedium(PriorityQueue<Integer> min, PriorityQueue<Integer> max) {
      while (max.size() > min.size() + 1) {
          min.offer(max.poll());
      }
      
      while (min.size() > max.size()) {
          max.offer(min.poll());
      }
      
      return max.size() == min.size() ? min.peek() : max.peek();
  }
}