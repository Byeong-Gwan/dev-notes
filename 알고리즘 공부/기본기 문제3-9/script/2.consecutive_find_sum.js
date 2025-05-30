/**
 * 
숫자 배열에서, **연속된 수의 합 중 가장 큰 값을 반환**하세요.

    - 🔹 입력: `[-2, 1, -3, 4, -1, 2, 1, -5, 4]`
        
    - 🔹 출력: `6` → `4 + (-1) + 2 + 1`
        

    📌 조건:

    - `for`문과 `조건문`만 사용
        
    - 카데인 알고리즘 힌트
        

 */
    /**
     * 카데인 알고리즘 (Kadane's Algorithm)
     * 
     * 현재 값 단독 vs 이전 누적합 + 현재 값 중 큰 값을 선택해 누적합 갱신.
     * - 현재 값이 더 크면 → 누적합을 끊고 새로 시작
     * - 누적합이 더 크면 → 이어붙이기
     * 
     * 이 과정을 반복하며 최대 합을 계속 갱신
     *----------------------------------------------------
     * 카데인 알고리즘: Math.max(현재 값, 현재값 + 누적값) 
     * 둘을 비교해서 가장 값이 큰 값을 가지고 다음 번 실행한다.
     */
    console.log(consecutiveSum([-2, 1, -3, 4, -1, 2, 1, -5, 4]));

    function consecutiveSum (arr) {
        if (arr.length === 1) return arr[0];

        for (let i = 1; i < arr.length; i++) {
            arr[i] = Math.max(arr[i], arr[i] + arr[i-1]);
        }

        return Math.max(...arr);
    }