/**
 * 
### 🔹 5. **조건 분기 + 다중 return**

    ```
    // ❓ 문자열이 대소문자 섞인 형태일 때, 대문자 비율이 더 높으면 모두 대문자로 변환하고, 아니면 모두 소문자로 변환 
    // 입력: "HeLLo" → 출력: "HELLO" 
    // 입력: "heLlo" → 출력: "hello"

 */

    const str1 = 'HeLLo';
    const str2 = 'hello';

    console.log(upperLowerCountConversion(str1));
    console.log(upperLowerCountConversion(str2));

    function upperLowerCountConversion (str) {
        let result = '';
        let upperCount = 0;
        let lowerCount = 0;

        for (let i = 0; i < str.length; i++) {
            const char = str[i];
            if (/[A-Z]/.test(char)) {
                upperCount++;
            } else if (/[a-z]/.test(char)) {
                lowerCount++;
            }
        }

        if (upperCount > lowerCount) {
            result = str.toUpperCase();
        } else if (lowerCount > upperCount) {
            result = str.toLowerCase();
        } else {
            result = str;
        }

        return result;

    }

    // function upperLowerCountConversion(str) {
    //     const upperCount = (str.match(/[A-Z]/g) || []).length;
    //     const lowerCount = (str.match(/[a-z]/g) || []).length;
        
    //     if (upperCount > lowerCount) return str.toUpperCase();
    //     if (lowerCount > upperCount) return str.toLowerCase();
    //     return str;
    // }