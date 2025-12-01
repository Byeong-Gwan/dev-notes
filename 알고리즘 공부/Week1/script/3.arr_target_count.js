// arr = [1,1,2,3,1], target=1 → 3
const arr = [1,1,2,3,1] 
const target = 1;
console.log(count(arr, target));

function count(arr, target) {
    let count = 0;
    for (let i = 0; i < arr.length; i++){
        if (arr[i] === target) {
            count++;
        }
    }
    return count;
 }