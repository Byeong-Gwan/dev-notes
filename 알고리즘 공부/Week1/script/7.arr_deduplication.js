
// [1,1,2,2,3] → [1,2,3]
const arr = [1,1,2,2,3];
console.log(unique(arr));

function unique(arr) {
    let set = new Set(arr);
    
    return Array.from(set);
}
