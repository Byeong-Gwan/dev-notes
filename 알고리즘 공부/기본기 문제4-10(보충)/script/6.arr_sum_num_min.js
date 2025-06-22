/**
 * 
### 6️⃣ **배열의 연속된 구간 중 “합이 가장 작은” 4개 구간의 합을 반환 (길이 2)**

    > 예: `[2, 5, 1, 3, 8]` → `3` (2+1=3이 최소)

    `function minSum(arr) { }`
 */
    const arr = [2, 5, 1, 3, 8];
    console.log(minSum(arr));

    function minSum(arr) {
        let min = arr[0] + arr[1];
        let sum = 0;

        arr.forEach((e, idx) => {
            if (idx < arr.length - 1) {
                sum = e + arr[idx + 1];

                if (sum < min) {
                    min = sum;
                }
            }
        });

        return min;
     }