/**
 * 
 * #### 1️⃣ **문자열 중복 문자 중 홀수 개 등장한 문자만 추출**

    `예: "aabbccd" → { "d": 1 } function oddCountOnly(str) { }`

 */
    const str = 'aabbccd';
    console.log(oddCountOnly(str))

    function oddCountOnly(str) { 
        const obj = {};

        for (const key of str) {
            obj[key] = (obj[key] || 0) + 1;
        }
        
        const result = {};
        Object.keys(obj).sort().forEach(char => {
            if (obj[char] % 2 !== 0) {
                result[char] = obj[char];
            } 
        });
        return result;
    }