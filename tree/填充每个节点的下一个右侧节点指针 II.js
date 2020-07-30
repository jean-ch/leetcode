/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */
/**
 * @param {Node} root
 * @return {Node}
 */

 /**
  * 思路： level-order-traversal
  * 也可以一边遍历一边填充 next，节省空间复杂度
  */
var connect = function(root) {
    let levels = levelOrderTraversal(root);
    fillNext(levels);
    return root;
};

function fillNext(levels) {
    for (let level of levels) {
        for (let i = 0; i < level.length; i++) {
            level[i].next = i === level.length - 1 ? null : level[i + 1]
        }
    }
}

function levelOrderTraversal(root) {
    if (root === null) {
        return [];
    }

    let levels = [];
    let list = [root];
    while (list.length > 0) {
        let level = [];
        let num = list.length;
        for (let i = 0; i < num; i++) {
            let node = list[0];
            list = list.slice(1);
            level.push(node);
        
            if (node.left !== null) {
                list.push(node.left);
            }

            if (node.right !== null) {
                list.push(node.right);
            }
        }

        levels.push(level);
    }

    return levels;
}