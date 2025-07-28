/**
 * 
 * #### 3️⃣ **문자열 압축**

    `// 입력: "aaabbcddd" // 출력: "a3b2c1d3"`

    힌트: 연속된 문자 세기
 */

    const str = "aaabbcddd";
    console.log(strCompression(str));

    function strCompression (str) {
        let count = 1;
        let result = '';

        for (let i = 0; i < str.length; i++) {
            if (str.length === 0) return '';
            
            if (str[i] === str[i + 1]) {
                count++;
            } else {
                result += str[i] + count;
                count = 1;
            }
        }

        return result;
    }