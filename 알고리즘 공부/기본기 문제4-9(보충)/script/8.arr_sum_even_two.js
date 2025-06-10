/**
 * 
#### 8️⃣ **배열에서 합이 짝수인 두 수 쌍만 추출**

    `// 예: [1, 2, 3, 4] → [[1, 3], [2, 4]] function evenSumPairs(arr) { }`
 */

    const arr = [1, 2, 3, 4];
    console.log(evenSumPairs(arr));

    function evenSumPairs(arr) {
        let result = [];

        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[i] === arr[j]) {
                    continue;
                }
                const sum = arr[i] + arr[j];
                if (sum % 2 === 0) {
                    result.push([arr[i], arr[j]]);
                }
            }
        }
        return result;
     }