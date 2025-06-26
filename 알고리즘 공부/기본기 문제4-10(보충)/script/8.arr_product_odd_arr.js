/**
 * 
### 8️⃣ **배열에서 “곱이 홀수”인 두 수 쌍만 추출**

    > 예: `[1, 2, 3, 4]` → `[[1,3]]`

    `function oddProductPairs(arr) { }`

 */
    const arr = [1, 2, 3, 4];
    console.log(oddProductPairs(arr));

    // function oddProductPairs(arr) {
    //     const oddPairs = [];

    //     for (let i = 0; i < arr.length; i++) {
    //         for (let j = i + 1; j < arr.length; j++) {
    //             if ((arr[i] * arr[j]) % 2 !== 0) {
    //                 oddPairs.push([arr[i], arr[j]]);
    //             }
    //         }
    //     }

    //     return oddPairs;
    //  }

    // 성능 효율성에는 이 로직이 더 좋음
     function oddProductPairs(arr) {
        const oddPairs = [];

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] % 2 === 0) continue;

            for (let j = i + 1; j < arr.length; j++) {
                if (arr[j] % 2 === 0) continue;
                oddPairs.push([arr[i], arr[j]]);
            }
        }

        return oddPairs;
     }