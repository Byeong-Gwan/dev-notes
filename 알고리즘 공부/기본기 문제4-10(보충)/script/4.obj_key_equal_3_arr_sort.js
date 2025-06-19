/**
 * 
### 4️⃣ **객체에서 value가 3 이상인 key만 “알파벳순” 배열로 반환**

> 예: `{a:2, b:5, c:4}` → `['b', 'c']`

`function keysWithValue3OrMore(obj) { }`

 */

    const obj = {'a':2, 'b':5, 'c':4};
    console.log(keysWithValue3OrMore(obj));

    function keysWithValue3OrMore(obj) { 
        let result = [];

        Object.keys(obj).forEach((char) => {
            if (obj[char] >= 3) {
                result.push(char);
            }
        });

        return result.sort();
    }