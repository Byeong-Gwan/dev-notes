/**
 * 
 * ## **📌 1️⃣ 배열 요소를 제곱한 새 배열 만들기 (기본)**

**📝 문제:**  
주어진 숫자 배열의 각 요소를 **제곱한 새로운 배열을 반환하는 함수**를 만들어라.

    **✔ 조건:**

    - `for`문을 사용해서 직접 배열을 순회할 것
        
    - `map()` 사용 금지
        

    **🔹 입력 예시:**

    `console.log(squareArray([1, 2, 3, 4]));` 

    **🔹 출력 예시:**

    `[1, 4, 9, 16]`

 */

    console.log(squareArray([1, 2, 3, 4]));

    function squareArray (arr) {
        let arr2 = [];

        for (let i = 0; i < arr.length; i++) {
            arr2[i] = arr[i] * arr[i];
        }
        return arr2;
    }