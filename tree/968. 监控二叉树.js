/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

 // 这个解法其实就是在下面那个超时的解法上用了 dp
 // 这 dp 呢不定非要搞个全局的 visited 数组
 // 下面那个解法的问题就是对 left，right 同样的东西算了好几次。鉴于 node 只跟 它自己的 left right 有关系，那么用函数返回值来记录一下会用到的数据就行了
 // 所以只要把 camera 和 covered 的三种组合状态一起返回就行了。
// return [covered: false, covered: true, camera: true]
function count(node, camera, covered)  {
  if (node === null) {
      return [0, 0, Number.MAX_VALUE];
  }

  let left = count(node.left);
  let right = count(node.right);

  // camera: true
  let ret2 = Math.min(left[1] + right[1],
                      left[2] + right[2],
                      left[1] + right[2],
                      left[2] + right[1]) + 1;

  // camera: false, covered: true
  let ret1 = Math.min(left[0] + right[2],
                      left[2] + right[2],
                      left[2] + right[0],
                      left[0] + right[0]);

  // camera: false, covered: false
  let ret0 = Math.min(left[2] + right[2],
                      left[2] + right[0],
                      left[0] + right[2]);

  return [ret0, ret1, ret2];
}

var minCameraCover = function(root) {
  let rootCount = count(root);
  return Math.min(rootCount[0], rootCount[2]);
};


//从上往下 traverse， 超时警告！！
// camera: 得不得安 camera
// covered: 有没有被监控到
function count(node, camera, covered)  {
  if (node === null) {
      return camera ? Number.MAX_VALUE : 0;
  }

  if (camera) {
      return Math.min(count(node.left, false, true) + count(node.right, false, true),
                      count(node.left, true, true) + count(node.right, true, true),
                      count(node.left, false, true) + count(node.right, true, true),
                      count(node.left, true, true) + count(node.right, false, true)) + 1;
  } else {
      if (covered) {
          return Math.min(count(node.left, false, false) + count(node.right, true, true),
                          count(node.left, true, true) + count(node.right, true, true),
                          count(node.left, true, true) + count(node.right, false, false),
                          count(node.left, false, false) + count(node.right, false, false));
      } else {
          return Math.min(count(node.left, true, true) + count(node.right, true, true),
                          count(node.left, true, true) + count(node.right, false, false),
                          count(node.left, false, false) + count(node.right, true, true));
      }
  }
}
var minCameraCover = function(root) {
  return Math.min(count(root, true, true), count(root, false, false));
};