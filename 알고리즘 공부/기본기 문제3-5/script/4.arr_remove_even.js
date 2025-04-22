/**
 * ### 🧩 4️⃣ 배열에서 짝수만 제거하기

    * 숫자 배열에서 짝수만 제거한 새 배열을 반환하세요.  
    * 🔹 입력: [1, 2, 3, 4, 5, 6]  
    * 🔹 출력: [1, 3, 5]
 */

console.log(evenRemove([1, 2, 3, 4, 5, 6]));

function evenRemove (arr) {
    return arr.filter(n => n % 2 !== 0);
}