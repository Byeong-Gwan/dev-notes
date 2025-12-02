
// [5,12,3,20] → [12,20]
const arr = [5,12,3,20];
console.log(filterGreaterThan10(arr));

function filterGreaterThan10(arr, target = 10) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > target) {
            result.push(arr[i]);
        }
    }

    return result;
}