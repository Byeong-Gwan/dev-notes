/**
 * 
#### 🔟 **배열에서 중복쌍 개수 세기**

    `// 입력: [1, 2, 1, 2, 1] // 출력: 4  → (1,1), (1,1), (2,2), (1,1)`

    힌트: 각 숫자별 개수로 조합 계산
 */

    const arr = [1, 2, 1, 2, 1];
    console.log(arrDuplicatePairs(arr));

    function arrDuplicatePairs (arr) {
        let obj = {};

        for (const key of arr) {
            obj = (obj[key] || 0) + 1;
            console.log(obj);
        }

        console.log(obj);
    }