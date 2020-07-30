/**
 * @param {number[][]} edges
 * @return {number[]}
 */

 /**
  * Solution:
  * redundant --> 有环
  * 用 unin find 找到致使成环的那条 edge
  */


function find(x, father) {
  let ancestor = x;
  while (father[ancestor] != ancestor) {
      ancestor = father[ancestor];
  }

  while (father[x] != ancestor) {
      let tmp = father[x];
      father[x] = ancestor;
      x = tmp;
  }

  return ancestor;
}

function merge(x, y, father) {
  let fatherx = find(x, father);
  let fathery = find(y, father);
  if (fatherx !== fathery) {
      father[fatherx] = fathery;
  }
}

var findRedundantConnection = function(edges) {
  let father = new Array();
  edges.forEach(e => {
      father[e[0]] = e[0];
      father[e[1]] = e[1];
  });

  for (let edge of edges) {
      let father1 = find(edge[0], father);
      let father2 = find(edge[1], father);
      if (father1 === father2) { // 成环了， edge 就是成环的最后一条边
          return edge;
      } else {
          merge(edge[0], edge[1], father); 
      }
      console.log(edge, father);
  }

  return [];
};