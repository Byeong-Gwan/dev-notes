/**
 * 
### **1-2. 중첩 배열에서 특정 값 찾기**

> 🔹 _개념_: 재귀 탐색 + 배열 순회  
> 🔹 _난이도_: ★★★☆☆

    **문제:**  
    주어진 중첩 배열에서 **특정 숫자 5**가 존재하는지 여부를 `true` 또는 `false`로 반환하세요.

    ```javascript
    const arr = [1, [2, [3, [4, [5]]]]]; 
    console.log(hasValue(arr, 5)); // true  

    const arr2 = [1, [2, [3, [4]]]]; 
    console.log(hasValue(arr2, 5)); // false  

    function hasValue(arr, target) {   // 여기에 재귀 함수 작성 
    ...
    }
    ```
 */

    const arr = [1, [2, [3, [4, [5]]]]]; 
    console.log(hasValue(arr, 5)); // true  

    const arr2 = [1, [2, [3, [4]]]]; 
    console.log(hasValue(arr2, 5)); // false  

    function hasValue(arr, target) {   // 여기에 재귀 함수 작성 
        for (let i = 0; i < arr.length; i++) {
            const current = arr[i];

            // 현재 값이 traget과 일치할 경우 즉시 true 반환
            if (current === target) return true;

            // 배열이면 재귀 호출
            if (Array.isArray(arr[i])) {
                const found = hasValue(current, target);

                if (found) return true;
            }
        }

        // 모든 요소를 순회했는데도 찾지 못한 경우 
        return false;
    }