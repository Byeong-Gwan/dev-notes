/**
 * 
### 🔹 3. **조건 제한 있는 반복문**

    ```
    // ❓ 문자열에서 연속으로 나온 동일 문자의 개수와 문자를 압축한 문자열 반환 
    // 입력: 'aaabbcddd' 
    // 출력: 'a3b2c1d3'
    ```
 */

    const str = 'aaabbcddd';
    console.log(strCompression(str));

    function strCompression (str) {
        let result = [];
        let count = 1;

        for (let i = 0; i < str.length; i++) {
            if (str[i] === str[i + 1]) {
                count++;
            } else {
                result.push(str[i] + count);
                count = 1;
            }
        }
        return result.join('');
    }