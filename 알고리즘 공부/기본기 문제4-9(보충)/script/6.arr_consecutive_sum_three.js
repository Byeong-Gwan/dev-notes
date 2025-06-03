/**
 * 
#### 6️⃣ **배열의 연속된 구간 합 중 최댓값 구하기 (길이 3 고정)**

    `// 예: [1, 3, 5, 2, 8] → 15 (5+2+8) function maxSum(arr) { }`

 */

    console.log(maxSum([1, 3, 5, 2, 8], 3));

    function maxSum(arr, target) {
        if (arr.length < target) return null;
        
        let maxSum = 0;

        // maxSum = arr[0] + arr[1] + arr[2]
        for (let i = 0; i < target; i++) {
            maxSum += arr[i];
        }

        let currentSum = maxSum;

        for (let i = target; i < arr.length; i++) {
            currentSum = currentSum - arr[i - target] + arr[i];
            maxSum = Math.max(currentSum, maxSum);
        }

        return maxSum;
     }