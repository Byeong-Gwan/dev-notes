/**
 * ### 2️⃣ **숫자 배열 내 고유 쌍 찾기**

    합이 10인 숫자 쌍의 수를 구하세요. 중복은 한 번만 카운트.

    ```
    // 입력: [1, 9, 2, 8, 3, 7, 5] 
    // 출력: 3  → (1+9, 2+8, 3+7)
    ```

 */

    console.log(numSum([1, 9, 2, 8, 3, 7, 5]));

    function numSum (arr) {
        let count = 0;
        
        for (let i = 0; i < arr.length; i++) {
            // 중복 제거를 위해 j 값에 i + 1 을 할당해줌
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[i] + arr[j] === 10) {
                    count++;
                }
            }
        }
        return count;

    }