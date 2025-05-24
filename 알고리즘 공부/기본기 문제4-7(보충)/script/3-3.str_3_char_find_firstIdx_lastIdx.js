/**
 * 3-3.

    - **문제:**  
        문자열에서 **3번 이상 등장하는 문자만 추출**하고, 해당 문자의 **첫 번째 인덱스와 마지막 인덱스의 차이**를 `{ 문자: 차이 }` 형식으로 반환하세요.
        
        
    ```javascript
    const str = "abcaabbcc";  
    console.log(findIndexGap(str)); // { "a": 6, "b": 5, "c": 5 }  

    function findIndexGap(str) {     // 여기에 로직 작성 

    }

 */

    const str = "abcaabbcc";  
    console.log(findIndexGap(str)); // { "a": 6, "b": 5, "c": 5 }  

    function findIndexGap(str) {     // 여기에 로직 작성 
        const countObj = {};
        const lastObj = {};
        const firstObj = {};

        for (let i = 0; i < str.length; i++) {
            const char = str[i];
            countObj[char] = (countObj[char] || 0) + 1;

            if (firstObj[char] === undefined) {
                firstObj[char] = i;
            }
            lastObj[char] = i;
        }

        const result = {};
        Object.keys(countObj).forEach(char => {
            if (countObj[char] >= 3) {
                result[char] = lastObj[char] - firstObj[char];
            }
        });

        return result;
    }
