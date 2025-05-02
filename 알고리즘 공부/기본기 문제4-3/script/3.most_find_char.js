/**
 * 
### 3️⃣ 가장 많이 등장한 문자 찾기

    > 문자열에서 **가장 많이 나온 문자**를 찾아 반환하세요.

    `// 입력: "aabbbccccd" // 출력: "c"`

    📌 조건

    - `for`, `객체`, `max` 비교
        
 */

    console.log(mostFindChar("aabbbccccd"));

    function mostFindChar (str) {
        let obj = {};

        // 문자열로 되어 있는 str값을 객체에 key: value 값으로 셋팅
        for (let i = 0; i < str.length; i++) {
            let char = str[i];
            obj[char] = (obj[char] || 0) + 1;
        }

        // 객체 중 value 값이 가장 큰 값의 key 값을 반환
        let max = 0;
        let result = '';

        for (const key in obj) {
            if (obj[key] > max) {
                max = obj[key];
                result = key
            }
        }
        return result;
    }