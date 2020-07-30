/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */

function traverse(nodes, combination, list) {
  if (nodes.length === 0) {
      list.push([...combination]);
      return;
  }

  for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      let newNodes = nodes.slice(0, i).concat(nodes.slice(i + 1));
      if (node.left) {
          newNodes.push(node.left);
      }

      if (node.right) {
          newNodes.push(node.right);
      }

      combination.push(node.val);
      traverse(newNodes, combination, list);
      combination.pop();
  }

  return list;
}

var BSTSequences = function(root) {
  if (!root) {
      return [[]];
  }
  return traverse([root], new Array(), new Array());
};