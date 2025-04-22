/**
 * 
## **📌 2️⃣ 배열에서 최댓값 찾기 (중급)**

**📝 문제:**  
주어진 숫자 배열에서 **최댓값을 찾아 반환하는 함수**를 작성하라.

    **✔ 조건:**

    - `for`문을 사용해서 직접 최댓값을 찾을 것
        
    - `Math.max()` 사용 금지
        

    **🔹 입력 예시:**

    `console.log(findMax([10, 3, 25, 7, 99, 1]));`

    **🔹 출력 예시:**

    `99`

 */

    console.log(findMax([10, 3, 25, 7, 99, 1]));

    function findMax (arr) {
        let max = arr[0];

        for (let i = 0; i < arr.length; i++) {
            if (max < arr[i]) {max = arr[i]}
        }
        return max
    }