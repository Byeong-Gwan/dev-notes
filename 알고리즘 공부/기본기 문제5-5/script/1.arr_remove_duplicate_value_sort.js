/**
 * 
### 1. **중복된 값 제거 + 정렬**

    ```
    // 배열에서 중복을 제거하고 오름차순으로 정렬하라. 
    // 입력: [4, 2, 2, 9, 1, 4, 7] 
    // 출력: [1, 2, 4, 7, 9]
 */

    const arr = [4, 2, 2, 9, 1, 4, 7];
    console.log(duplicateValueSorted(arr));

    function duplicateValueSorted (arr) {
        return arr
            .filter((value, idx) => arr.indexOf(value) === idx)
            .sort((a, b) => a - b);
    }