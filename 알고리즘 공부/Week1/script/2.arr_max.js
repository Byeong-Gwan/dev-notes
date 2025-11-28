
// [2, 9, 1, 7] → 9
const arr = [2, 9, 1, 7];
console.log(max(arr));
function max(arr) {
    let max = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (max < arr[i]) {
            max = arr[i];
        }
    }
    return max;
}