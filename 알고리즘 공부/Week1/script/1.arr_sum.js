
// [1, 2, 3, 4, 5] → 15
const arr = [1, 2, 3, 4, 5];
console.log(sum(arr));
function sum(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}