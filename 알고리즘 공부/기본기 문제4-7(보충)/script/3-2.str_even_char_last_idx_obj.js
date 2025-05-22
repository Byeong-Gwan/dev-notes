/**
 * 
3-2.

    - **문제:**  
        문자열에서 **짝수번 등장하는 문자**만 추출하고, 해당 문자의 **마지막 인덱스**를 `{ 문자: 인덱스 }` 형식으로 반환하세요.

        
    ```javascript
    const str = "aabbccddeee";  
    console.log(findEvenDuplicates(str)); // { "a": 1, "b": 3, "c": 5, "d": 7 }  

    function findEvenDuplicates(str) {     // 여기에 로직 작성 

    }

 */

    const str = "aabbccddeee";  
    console.log(findEvenDuplicates(str)); // { "a": 1, "b": 3, "c": 5, "d": 7 }  

    function findEvenDuplicates(str) {     // 여기에 로직 작성 
        const countObj = {};
        const lastIdxObj = {};

        for (let i = 0; i < str.length; i++) {
            const char = str[i];
            countObj[char] = (countObj[char] || 0) + 1;
            lastIdxObj[char] = i;
        }

        const result = {};

        Object.keys(lastIdxObj).sort().forEach(char => {
            if (countObj[char] > 1 && countObj[char] % 2 === 0) {
                result[char] = lastIdxObj[char];
            }
        });
        
        return result;
    }
