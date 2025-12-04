
// [1,2,3] → [2,3,4]
const arr = [1,2,3];
console.log(plusOne(arr));

function plusOne(arr) {
    return arr.map((num) => num + 1);
}