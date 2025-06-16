/**
 * 
 * ### 1️⃣ **문자열에서 “짝수 번” 등장한 문자만 추출해서 객체로 반환**

    > 예: `"aabbccddde"` → `{ a: 2, b: 2, c: 2 }`  
    > (짝수 번 등장한 문자만 key/value로)

    `function evenCountOnly(str) { }`
 */

    const str = "aabbccddde";
    console.log(evenCountOnly(str));

    function evenCountOnly(str) {
        let obj = {};

        for (const value of str) {
            obj[value] = (obj[value] || 0) + 1;
        }

        let result = {};
        for (const key in obj) {
            if (obj[key] % 2 === 0) {
                result[key] = obj[key]
            }
        }
        return result;

     }