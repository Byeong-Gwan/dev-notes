/**
 * 1-3.

    - **문제:**  
        문자열에서 **중복된 문자만 추출**하고, 해당 문자의 **첫 번째와 마지막 인덱스의 차이**를 `{ 문자: 차이 }` 형식으로 반환하세요.
        
        
    ```javascript
    const str = "abcabcabc";  
    console.log(findIndexDifference(str)); // { "a": 6, "b": 6, "c": 6 } 

    function findIndexDifference(str) {     // 여기에 최적화된 로직 작성 

    }

 */

    const str = "abcabcabc";  
    console.log(findIndexDifference(str)); // { "a": 6, "b": 6, "c": 6 } 

    function findIndexDifference(str) {     // 여기에 최적화된 로직 작성 
        let obj = {};

        for (let i = 0; i < str.length; i++) {
            const char = str[i];

            // 이미 등장한 문자일 경우, 마지막 인덱스 갱신
            if (obj[char]) {
                obj[char].last = i;
            } else {
                // 처음 등장한 문자일 경우, 첫 번째 인덱스와 마지막 인덱스 동일하게 설정
                obj[char] = { first: i, last: i};
            }
        }

        let result = {};

        for (const char in obj) {
            const firstIdx = obj[char].first;
            const lastIdx = obj[char].last;

            // 첫 번째와 마지막 인덱스가 다를 경우 (즉, 중복된 문자일 경우)
            if (firstIdx !== lastIdx) {
                result[char] = lastIdx - firstIdx;
            }
        }

        return result;
    }
