/**
 * 
### 5️⃣ 주어진 단어 중 길이가 가장 긴 단어 반환

    `// 입력: ["dog", "elephant", "cat"] → 출력: "elephant" function longestWord(arr) { }`

    _학습 포인트: 조건 비교, 최대값 찾기_
 */

    const arr = ["dog", "elephant", "cat"];
    console.log(longestWord(arr));

    function longestWord(arr) {
        let max = arr[0].length;
        let result = arr[0];

        for (let i = 1; i < arr.length; i++) {
            if (arr[i].length > max) {
                max = arr[i].length;
                result = arr[i];
            }
        }

        return result;

    }