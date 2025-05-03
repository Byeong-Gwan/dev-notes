/**
 * 
### 2️⃣ 부분 수열 중 최대 합 찾기 (연속 X)

    > 정수 배열에서 **아무 숫자나 골라서** 만들 수 있는  
    > **최대 합**을 구하세요. 단, **연속**되지 않아도 됨.

    `// 입력: [-1, 2, 3, -5, 4] // 출력: 9 (2 + 3 + 4)`

    📌 조건

    - `for`, `if` 만 사용 가능
        
    - `reduce`, `sort` 금지
        
 */

    console.log(subMaxFindSum([-1, 2, 3, -5, 4]));

    function subMaxFindSum (arr) {
        let dp = arr.slice(); // 각 위치에서의 최대 합 초기값 (자기 자신)

        for (let i = 1; i < arr.length; i++) {
            dp[i] = arr[i];
            for (let j = 0; j < i; j++) {
                if (arr[i] > arr[j]) {
                    dp[i] = Math.max(dp[i], dp[j] + arr[i]);
                }
            }
        }
        return Math.max(...dp);
    }