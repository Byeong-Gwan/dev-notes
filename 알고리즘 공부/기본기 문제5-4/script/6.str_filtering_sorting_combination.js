/**
 * 
### 🔹 6. **문자열 필터링 + 정렬 조합 문제**

    ```
    // ❓ 문자열 배열 중 길이가 3 이상인 항목만 오름차순 정렬하여 반환하라. 
    // 입력: ["hi", "apple", "go", "bear", "z"] 
    // 출력: ["apple", "bear"]
    ```

    - ✔ 조건 필터링 + 정렬 로직 훈련
 */

    const arr = ["hi", "apple", "go", "bear", "z"];
    console.log(strFilteringSortCombination(arr, 3));

    function strFilteringSortCombination (arr, target) {
       return [...arr].filter(word => word.length >= target).sort();
    }