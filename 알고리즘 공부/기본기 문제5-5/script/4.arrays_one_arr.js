/**
 * 
### 4. **중첩 배열 평탄화**

    ```
    // 다차원 배열을 1차원 배열로 평탄화하라. 
    // 입력: [1, [2, [3, 4], 5], 6] 
    // 출력: [1, 2, 3, 4, 5, 6]
    ```
 */

    const arr = [1, [2, [3, 4], 5], 6];
    console.log(arraysOneArr(arr));

    function arraysOneArr (arr) {
        // 몇개의 배열이 중첩될지 몰라 Infinity 안전하게 처리
        return arr.flat(Infinity);
    }