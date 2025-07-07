/**
 * 
### 6️⃣ 객체에서 value가 짝수인 key만 배열로 반환

    `// 입력: {a: 2, b: 5, c: 4} → 출력: ["a", "c"] function evenValueKeys(obj) { }`

    _학습 포인트: key-value 분리, 조건 필터링_
 */

    const obj = {a: 2, b: 5, c: 4};
    console.log(evenValueKeys(obj));

    function evenValueKeys(obj) {
        let result = [];

        Object.keys(obj).forEach((char) => {
            if (obj[char] % 2 === 0) {
                result.push(char);
            }
        });

        return result;
    }