// [2,4,6] → 4
const arr = [2,4,6];
console.log(average(arr));

function average(arr) {
    let num = 0;
    arr.filter((n) => num += n);
    return num / arr.length;

}