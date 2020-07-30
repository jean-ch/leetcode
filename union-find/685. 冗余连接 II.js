/**
 * Solution:
 * 分类考虑 2 中情况：
 * 1. 所有节点都只有 1 个爸爸，删掉任意一条成环的边都能满足 valid tree： 找最后一个成环的边，用 union-find， 参考 684
 * 2. 有 1 个节点有 2 个爸爸： 多余的边肯定在指向这个节点的 2 条边里。
 * （为啥考虑爸爸异常的情况： 
 *    因为树的所有节点至多只有 1 个爸爸（root 没有爸爸，别的点有 1 个爸爸），
 *    如果所有节点都只有 1 个爸爸，删去任意一条边，就可以形成一个 root
 *    吐过有 2 个爸爸的话，多余的边肯定从这2 条里面出， 这条边是成环的关键）
 * 
 * 因此先把这 2 条边抛开，
 * 如果剩下的边里有成环的，那就符合情况 1 ，直接返回这条边
 * 再把这 2 条边依次加进去，把成环的那条边 return 出来
 */

 /**
 * @param {number[][]} edges
 * @return {number[]}
 */

function find(x, father) {
  let ancestor = x;
  while (father[ancestor] != ancestor) {
      ancestor = father[ancestor];
  }

  while (x != ancestor) {
      let tmp = father[x];
      father[x] = ancestor;
      x = tmp;
  }

  return ancestor;
}

function merge(x, y, father) {
  let fx = find(x, father);
  let fy = find(y, father);
  if (fx !== fy) {
      father[fx] = fy;
  }
}

var findRedundantDirectedConnection = function(edges) {
  let map = new Map();
  let possibleEdges = [];
  edges.forEach(e => {
      if (!map.has(e[1])) {
          map.set(e[1], []);
      }

      map.get(e[1]).push(e);
      if (map.get(e[1]).length === 2) {
          possibleEdges = map.get(e[1]);
      }
  })

  let father = new Array();
  edges.forEach(e => {
      father[e[0]] = e[0];
      father[e[1]] = e[1];
  });

  // console.log(possibleEdges);

  for (let edge of edges) {
      if (!possibleEdges.includes(edge)) {
          let fx = find(edge[0], father);
          let fy = find(edge[1], father);
          if (fx === fy) {
              return edge;
          } else {
              merge(edge[0], edge[1], father);
          }
      }
  }

  for (let edge of possibleEdges) {
      let fx = find(edge[0], father);
      let fy = find(edge[1], father);
      if (fx === fy) {
          return edge;
      } else {
          merge(edge[0], edge[1], father);
      }
  }

  return [];
};