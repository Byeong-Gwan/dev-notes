/**
 * ### 🧩 2️⃣ 특정 값의 등장 횟수 세기

배열과 숫자 n이 주어졌을 때, n이 몇 번 등장하는지 세어 반환하세요.  
    * 🔹 입력: ([1, 2, 3, 2, 4, 2], 2)  
    * 🔹 출력: 3  
*/

console.log(valueCountNum([1, 2, 3, 2, 4, 2], 2));

function valueCountNum(arr, num) {
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === num) {
            count++;
        }
    }
    return count;
}