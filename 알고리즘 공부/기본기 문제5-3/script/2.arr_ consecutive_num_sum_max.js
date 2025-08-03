/**
 * 
#### 2️⃣ **배열에서 연속된 숫자 구간 합 중 최대값 (슬라이딩 윈도우)**

    `// 입력: [1, -2, 3, 5, -1, 2] // 출력: 9  → (3 + 5 + -1 + 2)`
 */
    const arr =  [1, -2, 3, 5, -1, 2];
    console.log(consecutiveNumSum(arr, 4));

    function consecutiveNumSum (arr, len) {
        if (arr.length < len) return null;

        // 첫 번째 구간의 합 계산
        let maxSum = 0;
        for (let i = 0; i < len; i++) {
            maxSum += arr[i];            
        }
        
        let currentSum = maxSum;

        // 슬라이딩 윈도우 시작
        for (let i = len; i < arr.length; i++) {
            // 이전 구간의 첫 번째 값은 빼고, 새로 들어온 값을 더함
            currentSum = currentSum - arr[i - len] + arr[i];
            maxSum = Math.max(maxSum, currentSum);
        }

        return maxSum;
    }