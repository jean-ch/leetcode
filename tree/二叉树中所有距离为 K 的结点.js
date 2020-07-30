/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} K
 * @return {number[]}
 */

/**
 * 
 * 思路：先从下往上，把 target 所在的子数给标记了，再从上往下把剩下的节点标记并输出要求距离的节点
 * 注意：parseInt(Number.Negative_Inifinity) 是 NaN，所以用 null 来填未标记的节点。但是 null 在运算的时候会被转成 0，所以在标记跟节点取 Math.max 的时候，对 null 要做 Inifinity 处理
 */

var distanceK = function(root, target, K) {
    let node = findDeepDistance(root, target, null);
    return updateDistance(node, K, -1);
};

function updateDistance(node, target, distance) {
    let nodes = [];
    if (node === null || node.node === null) {
        return [];
    }

    node.distance = node.distance !== null ? node.distance : distance + 1;
    if (target === node.distance) {
        nodes = [node.node.val];
    }
        
    return [...nodes, ...updateDistance(node.left, target, node.distance), ...updateDistance(node.right, target, node.distance)];
}

function Node(node, distance) {
    this.node = node;
    this.distance = distance;
    this.left = this.right = null;
}

function findDeepDistance(root, target, lastDistance) {
    if (root === null) {
        return new Node(root, null);
    }

    let distance = null;
    let leftDistance = null;
    let rightDistance = null;

    if (lastDistance !== null) {
        distance = leftDistance = rightDistance = lastDistance + 1;
    }
     
    if (root === target) {
        distance = leftDistance = rightDistance = 0;
    } 

    let left = findDeepDistance(root.left, target, leftDistance);
    let right = findDeepDistance(root.right, target, rightDistance);
    
    if (distance === null && (left.distance !== null || right.distance !== null)) {
        distance = Math.min(left.distance === null ? Number.POSITIVE_INFINITY : left.distance, right.distance === null ? Number.POSITIVE_INFINITY : right.distance) + 1
    }

    // console.log("node: ", root.val);
    // console.log("distance: ", distance);

    let current = new Node(root, distance);
    current.left = left;
    current.right = right;
    return current;
}