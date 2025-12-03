
// [{name:'a'}, {name:'b'}] → ['a','b']
const arr = [{name:'a'}, {name:'b'}];
console.log(pluck(arr, 'name'));

function pluck(arr, key) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        result.push(arr[i][key]);
    }
    return result;
}