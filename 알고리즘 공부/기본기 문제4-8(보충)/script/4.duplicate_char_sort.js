/**
 * 
### ✅ 4. 중복 문자 제거 및 정렬

#### 원래 문제: 중복 문자 제거하고 정렬하기

    > **🔁 연습 문제:**  
    > 문자열에서 **중복 문자 제거 후 내림차순 정렬된 결과**를 반환하세요.

    ```javascript
    const str = "bbaaaccdd";   

    console.log(removeAndSortDesc(str)); // "dcba"
 */

    const str = "bbaaaccdd";   

    console.log(removeAndSortDesc(str)); // "dcba"

    function removeAndSortDesc (str) {
        const arr = str.split('').sort().reverse();
        const result = [...new Set(arr)];
        return result.join('');
    }