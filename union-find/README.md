#### code template
```
// initiation
function unionFind() {
  let father = new Array();
  for (let i = 0; i < n; i++) {
    father[i] = i; // 初始 father 是它自己
  }
}

// find: 找到祖先，然后进行路径压缩，把经过的所有点的 father 都指向祖先
function find(value, father) {
  let ancestor = value;
  while (father[ancestor] != ancestor) { // 最终的祖先，它的 father 肯定是指向自己的
    ancestor = father[ancestor];
  }

  // 把路径上所有的 ancestor 的 father 都指向 root father
  while (value != ancestor) {
    let tmp = father[value];
    father[value] = ancestor;
    value = tmp;
  }

  return ancestor;
}

// merge: 找到两个元素 a, b 的 father，把其中一个的 father 指向另一个的 father
function merge(a, b, father) {
  let fatherA = find(a, father);
  let fatherB = find(b, father);
  if (fatherA !== fatherB) {
    father[a] = fatherB;
  }
}
```