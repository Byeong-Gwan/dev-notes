/**
 * 
#### 6️⃣ **주어진 배열로 만들 수 있는 두 수의 합 중 최대값**

    `// 입력: [1, 2, 4, 5] // 출력: 9  → 4 + 5`
 */

    const arr = [1, 2, 4, 5];
    console.log(arrSumMax(arr));

    function arrSumMax (arr) {
        // 배열을 내림차순으로 정렬 후 첫번쨰, 두번째 큰 값을 더하면 완료
        const sorted = arr.slice().sort((a, b) => b - a);
        return sorted[0] + sorted[1];
    }