
// [1,2,3,4,5,6] → [2,4,6]
const arr = [1,2,3,4,5,6];
console.log(evens(arr));

function evens(arr) {
    let result = [];
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0) {
            result.push(arr[i]);
        }
    }
    return result;
}