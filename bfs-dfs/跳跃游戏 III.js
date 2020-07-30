/**
 * @param {number[]} arr
 * @param {number} start
 * @return {boolean}
 */

var canReach = function(arr, start) {
    if (!arr || arr.length == 0 || start < 0 || start >= arr.length) {
        return false;
    }

    let can = [];
    let q = [];   
    q.push(start);
    while (q.length > 0) {
        let index = q.shift();
        if (arr[index] === 0) {
            return true;
        }
        
        can[index] = true;
        let left = index - arr[index];
        if (!can[left] && inArr(arr, left)) {
            q.push(left);
        }

        let right = index + arr[index];
        if (!can[right] && inArr(arr, right)) {
            q.push(arr, right);
        }

        // console.log(can);
        // console.log(q);
    }

    return false;
} 

function inArr(arr, index) {
    return index >= 0 && index < arr.length;
}