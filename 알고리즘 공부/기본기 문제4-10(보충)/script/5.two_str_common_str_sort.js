/**
 * 
### 5️⃣ **두 문자열에서 공통이 아닌 문자만 추출해 정렬된 문자열로 반환**

    > 예: `"abcde", "cdefg"` → `"abfg"`

    `function uncommonChars(str1, str2) { }`

 */

    const str1 = "abcde";
    const str2 = "cdefg";
    console.log(uncommonChars(str1, str2));

    function uncommonChars(str1, str2) {
        const set1 = new Set(str1);
        const set2 = new Set(str2);

        const removeCommon = [];

        set1.forEach(char => {
            if (!set2.has(char)) {
                removeCommon.push(char);
            }
        });

        set2.forEach(char => {
            if (!set1.has(char)) {
                removeCommon.push(char);
            }
        });

        return removeCommon.sort().join('');
        
        
     }