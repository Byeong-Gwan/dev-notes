/**
 * 
### ✅ 2. 패턴 매칭

#### 원래 문제: 문자열에서 'abc' 패턴의 첫 인덱스 찾기

    > **🔁 연습 문제:**  
    > 문자열에서 **"xyz"라는 패턴**이 처음으로 등장하는 인덱스를 반환하세요. (없으면 -1)

    ```javascript
    const str = "abaxyzabcxyz";   

    console.log(findPatternIndex(str, "xyz")); // 3
 */

    const str = "abaxyzabcxyz";   

    console.log(findPatternIndex(str, "xyz")); // 3

    function findPatternIndex (str, pattern) {

        for (let i = 0; i < str.length - pattern.length; i++) {
            if (str.substring(i, i + pattern.length) === pattern) {
                return i;
            }
        }

        return -1;
    }