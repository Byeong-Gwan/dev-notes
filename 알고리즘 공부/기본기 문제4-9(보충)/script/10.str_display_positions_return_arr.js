/**
 * 
#### 🔟 **문자열의 각 문자별 등장 위치 배열로 반환**

    `// 예: "abacab" → { "a": [0,2,4], "b":[1,5], "c":[3] } function indexMap(str) { }`
 */

    const str = "abacab";
    console.log(indexMap(str));

    function indexMap(str) {
        let obj = {};

        for (let i = 0; i < str.length; i++) {
            const char = str.charAt(i);

            if (!obj[char]) {
                obj[char] = []; // key 없으면 빈 배열 반환
            }
            obj[char].push(i); // 인덱스 추가
        }
        return obj;
     }