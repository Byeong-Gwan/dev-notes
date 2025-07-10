/**
 * 
### 7️⃣ 객체에서 가장 많이 등장한 value 반환

    `// 입력: {a: "x", b: "y", c: "x"} → 출력: "x" function mostFrequentValue(obj) { }`

    _학습 포인트: value 빈도수 파악_
 */

    const obj = {a: "x", b: "y", c: "x"};
    console.log(mostFrequentValue(obj))

    function mostFrequentValue(obj) {
        const arr = Object.values(obj);
        const count = {};
        let maxCount = 0;
        let result = '';

        for (let i = 0; i < arr.length; i++) {
            const value = arr[i];
            count[value] = (count[value] || 0) + 1;

            if (count[value] > maxCount) {
                maxCount = count[value];
                result = value;
            }
        }

        return result;
    }