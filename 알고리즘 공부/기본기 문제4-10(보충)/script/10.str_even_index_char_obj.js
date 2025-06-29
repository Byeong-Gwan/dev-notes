/**
 * 
### 🔟 **문자열에서 각 문자별 등장 위치 중 짝수번째(0,2,4…) 인덱스만 객체로 반환**

    > 예: `"abacab"` → `{ a: [0,4], b: [2], c: [] }`  
    > (위치가 짝수인 인덱스만 해당 문자 배열에 포함)

    `function evenIndexMap(str) { }`
 */

    const str ="aabcab";
    console.log(evenIndexMap(str));

    function evenIndexMap(str) {
        let obj = {};

        for (let i = 0; i < str.length; i++) {
            const char = str.charAt(i);

            if (!obj[char]) {
                obj[char] = [];
            }

            if (i % 2 === 0) {
                obj[char].push(i);
            }
        }
        return obj
     }