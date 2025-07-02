/**
 * 
### 2️⃣ 배열에서 5보다 크고 10보다 작은 숫자만 반환

    `// 입력: [3, 6, 9, 12] → 출력: [6, 9] function filterRange(arr) { }`

    _학습 포인트: 논리 연산자 활용, 조건 조합_

 */

    const arr = [3, 6, 9, 12];
    console.log(filterRange(arr));

    function filterRange(arr) {
        let result = [];

        for (let i = 0; i < arr.length; i++) {
            
            if (5 < arr[i] && arr[i] < 10) {
                result.push(arr[i]);
            }
        }

        return result;
    }