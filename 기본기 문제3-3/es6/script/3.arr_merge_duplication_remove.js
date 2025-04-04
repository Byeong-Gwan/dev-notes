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
    
    function mergeUnique(arr1, arr2) {
        const merged = arr1.concat(arr2);
        const unique = merged.filter((value, index) => merged.indexOf(value) === index);
        return unique;
    }
    