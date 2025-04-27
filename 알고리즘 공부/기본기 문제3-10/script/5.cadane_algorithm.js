/**
 * 
### 5️⃣ **연속 부분 배열 합의 최대값 (카데인 변형)**

    배열의 연속된 부분합 중 최대 합을 구하세요.

    ```
    // 입력: [-2,1,-3,4,-1,2,1,-5,4] 
    // 출력: 6 → (4 + (-1) + 2 + 1)
    ```
 */

    console.log(cadaneAlgor([-2,1,-3,4,-1,2,1,-5,4]));

    function cadaneAlgor (arr) {
        if (arr.length === 1) return arr[0];

        for (let i = 1; i < arr.length; i++) {
            arr[i] = Math.max(arr[i], arr[i] + arr[i-1]);
        }

        return Math.max(...arr);
    }