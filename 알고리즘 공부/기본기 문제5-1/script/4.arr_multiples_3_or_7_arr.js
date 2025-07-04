/**
 * 
### 4️⃣ 배열에서 3의 배수 또는 7의 배수만 반환

    `// 입력: [1, 3, 7, 9, 14, 21] → 출력: [3, 7, 9, 14, 21] function multipleFilter(arr) { }`

    _학습 포인트: 또는(OR) 조건 조합_
 */

    const arr = [1, 3, 7, 9, 14, 21];
    console.log(multipleFilter(arr));

    function multipleFilter(arr) {
        const result = [];

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] % 3 === 0 || arr[i] % 7 === 0 ) {
                result.push(arr[i]);
            }
        }

        return result;
    }

    // function multipleFilter(arr) {
    //     return arr.filter(num => num % 3 === 0 || num % 7 === 0);
    // }