/**
 * 
### 7️⃣ **문자열에서 각 문자의**첫 번째와 두 번째 등장 간격**이 2 이상이면 포함하고, **한 번만 등장한 문자는 제외**한다**

    > 입력: "abacaba"
    > 정답: { a: 2, b: 4 }

    `function spacedFirstGapChars(str) { }`

 */
    const str = "abacaba";
    console.log(spacedFirstGapChars(str));

    function spacedFirstGapChars(str) {
        let obj = {};
        let result = {};
        
        for (let i = 0; i < str.length; i++) {
            const char = str.charAt(i);

            if (!obj[char]) {
                obj[char] = [i];
            } else {
                obj[char].push(i);
            }

        }

        Object.keys(obj).forEach((e, idx) => {
            if (obj[e].length>= 2) {
                const gap =obj[e][1] - obj[e][0];

                if (gap >= 2) {
                    result[e] = gap;
                }
            }
        })
        return result;
        
     }