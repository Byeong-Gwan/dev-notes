/**
 * 
## **📌 3️⃣ 두 개의 배열을 합치고 중복 제거하기 (중급)**

**📝 문제:**  
두 개의 배열을 합쳐서 **중복 없는 새로운 배열을 반환하는 함수**를 만들어라.

    **✔ 조건:**

    - `for`문을 사용해서 직접 배열을 순회할 것
        
    - `Set()` 사용 금지
        

    **🔹 입력 예시:**

    `console.log(mergeUnique([1, 2, 3], [3, 4, 5]));`

    **🔹 출력 예시:**

    `[1, 2, 3, 4, 5]`
 */

    console.log(mergeUnique([1, 2, 3], [3, 4, 5]));

    // 동작은 하지만 정상적으로 처리가 안되는 경우 존재 문제점 개선 필요
    // function mergeUnique (arr1, arr2) {
    //     for (let i = 0; i < arr1.length; i++){
    //         for (let j = 0; j < arr2.length; j++) {
    //             if (arr1[i] === arr2[j]) {arr1.splice(i, 1);}
    //         }
    //     }
    //     return [...arr1, ...arr2];
        
    // }

    function mergeUnique (arr1, arr2) {
        let result = [];

        // 두 배열 하나로 합침
        let merged = arr1.concat(arr2);

        // 중복 제거 로직 (for 문 사용)
        for (let i = 0; i < merged.length; i++) {
            if (result.indexOf(merged[i]) === -1) {
                result.push(merged[i]);
            }
        }
        return result;
    }