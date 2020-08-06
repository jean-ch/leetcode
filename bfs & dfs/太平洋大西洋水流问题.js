/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */

 /**
  * 思路：从matrix的四条边 dfs
  * 注意： js 数组找符合条件的成员用 some
  */
var pacificAtlantic = function(matrix) {
    let result = [];
    if (!matrix || !matrix[0]) {
        return result;
    }

    let nodes = matrix.map(line => line.map(e => new Node(e)));
    let m = matrix.length;
    let n = matrix[0].length;

    for (let i = 0; i < m; i++) {
        nodes[i][0].av1 = true;
        nodes[i][n - 1].av2 = true;
    }

    for (let j = 0; j < n; j++) {
        nodes[0][j].av1 = true;
        nodes[m - 1][j].av2 = true;
    }
    
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            update(nodes, i, j);
        }
    }

    for (let i = m - 1; i >= 0; i--) {
        for (let j = 0; j < n; j++) {

            update(nodes, i, j);
        }
    }

    for (let i = 0; i < m; i++) {
        for (let j = n - 1; j >= 0; j--) {
            update(nodes, i, j);
        }
    }

    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            update(nodes, i, j);
            if (nodes[i][j].av1 && nodes[i][j].av2) {
                result.push([i, j])
            }
        }
    }

    return result;
};

let directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

function update(nodes, i, j) {
    dfs(nodes, i, j, 'av1');
    dfs(nodes, i, j, 'av2');
}

function dfs(nodes, i, j, param) {
    if (!nodes[i][j][param]) {
        return;
    }

    for (let direction of directions) {
        let x = direction[0] + i;
        let y = direction[1] + j;
        if (x < 0 || x >= nodes.length || y < 0 || y >= nodes[0].length) {
            continue;
        }

        if (nodes[x][y][param] || nodes[x][y].val < nodes[i][j].val) {
            continue;
        }

        nodes[x][y][param] = nodes[i][j][param];
        dfs(nodes, x, y, param);
    }
}

function Node(val, av1 = false, av2 = false) {
    this.val = val;
    this.av1 = av1;
    this.av2 = av2;
}

