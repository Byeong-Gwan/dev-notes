/**
 * 
### 🔹 7. **객체 배열 정렬 문제**

    ```
    // ❓ 사용자 목록 배열에서 나이가 많은 순으로 정렬하라. 
    // 입력: [{name: "A", age: 30}, {name: "B", age: 25}] 
    // 출력: [{name: "A", age: 30}, {name: "B", age: 25}]
    ```

    - ✔ 객체 정렬 기본 패턴 익히기
        
    - 💡 보너스: `name` 기준 정렬도 한번 해보세요
    
 */

    const obj1 = [{name: "A", age: 30}, {name: "B", age: 25}];
    const obj2 = [{name: "Jans", age: 30}, {name: "Bin", age: 25}];
    console.log(objSorting(obj1, true));
    console.log(objSorting(obj2, false));

    function objSorting (obj, isAgeSort) {
        if (isAgeSort) {
            return [...obj].sort((a, b) => b.age - a.age);
        } else {
            // localeCompare [A ~ Z] 내림(오름) 차순 정렬
            return [...obj].sort((a, b) => a.name.localeCompare(b.name)); 
        }
        
    }