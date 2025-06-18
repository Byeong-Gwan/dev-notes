/**
 * 
### 3️⃣ **문자열에서 한 번만 등장한 문자만 남기고 모두 제거**

    > 예: `"aabccd"` → `"bd"`

    `function removeNotOnce(str) { }`

 */

    const str = "aabccd";
    console.log(removeNotOnce(str));

    function removeNotOnce(str) {
        let obj = {};
        let result = [];

        for (const key of str) {
            obj[key] = (obj[key] || 0) + 1;
        }

        Object.keys(obj).forEach((char) => {
            if (obj[char] === 1) {
                result.push(char);
            }
        });
        return result.join('');
     }