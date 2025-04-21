/**
 * ### 🧩 **5️⃣ 짝수 번째 요소만 추출**

    > 배열에서 짝수 번째(인덱스 기준으로 0, 2, 4...) 요소만 추출해 새로운 배열로 반환하세요.

    - 🔹 입력: `["a", "b", "c", "d", "e", "f"]`
        
    - 🔹 출력: `["a", "c", "e"]`
        

    📌 `for`, `push`, `%` 연산 활용

 */

    console.log(evenElements(["a", "b", "c", "d", "e", "f"]));

    function evenElements (arr) {
        let result = [];

        for (let i = 0; i < arr.length; i++){
            if (i % 2 === 0) {
                result.push(arr[i]);
            }
        }
        return result;
    }