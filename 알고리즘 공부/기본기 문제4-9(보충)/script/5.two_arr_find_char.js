/**
 * 
#### 5️⃣ **두 문자열에서 공통으로 등장한 문자만 추출하여 정렬된 문자열로 반환**

    `// 예: "abcde", "cdefg" → "cde" function commonChars(str1, str2) { }`

 */

    console.log(commonChars("abcde", "cdefg"));

    function commonChars(str1, str2) { 
        const set1 = new Set(str1);
        const set2 = new Set(str2);
        console.log('set1', set1);
        console.log('set2', set2);

        const common = [];

        set1.forEach(char => {
            if (set2.has(char)) {
                common.push(char);
            }
        });

        return common.sort().join('');
    }