/**
 * ### 🧩 1️⃣ **짝수 홀수 나누기**

* 숫자 배열이 주어졌을 때, 짝수와 홀수를 나눠서 각각 다른 배열에 담아 출력하는 함수를 작성하세요.  

* 📌 조건  
*    - for문 사용  
*   - 숫자 외 요소는 무시  
*   🔹 입력 예시: [1, 2, 3, 4, 'a', 5, 6]  
*   🔹 출력 예시: 짝수: [2, 4, 6], 홀수: [1, 3, 5]  
*/
const result = oddEvenArr ([1, 2, 3, 4, 'a', 5, 6]);
console.log('홀수: ', result);
console.log('짝수: ', result);


function oddEvenArr (arr) {
    let oddArr = [];
    let evenArr = [];

    arr.forEach((e) => {
        arr.filter((e) => {
            if (typeof e !== 'number'){
                return;
            }
        })
        console.log('eee',arr)
    })
}