/**
 * 
#### 9️⃣ **문자열에서 가장 많이 등장한 문자 모두 반환 (복수 가능)**

    `// 예: "aabbbc" → ['b'] function topFreqChars(str) { }`
 */

    const str = "aabbbc";
    console.log(topFreqChars(str));

    function topFreqChars(str) {
        let obj = {};
        for (const key of str) {
            obj[key] = (obj[key] || 0) + 1;
        }

        const frequency = Object.values(obj);

        const max = Math.max(...frequency);

        const selected = Object.keys(obj).filter((key) => {
            return obj[key] === max;
        });
        
        return selected
     }