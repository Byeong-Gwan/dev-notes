/**
 * ### ✅ **3. 엣지 케이스 고려 - 중첩된 중복 체크 (3문제)**

3-1.

    - **문제:**  
        문자열에서 **4번 이상 등장하는 문자**만 추출하고, 해당 문자의 **등장 횟수**를 `{ 문자: 횟수 }` 형식으로 반환하세요.
        
        
    ```javascript
    const str = "aabbcccddddeeee";  
    console.log(findQuadrupleDuplicates(str)); // { "d": 4, "e": 4 }  

    function findQuadrupleDuplicates(str) {    // 여기에 로직 작성 

    }

 */

    const str = "aabbcccddddeeee";  
    console.log(findQuadrupleDuplicates(str)); // { "d": 4, "e": 4 }  

    function findQuadrupleDuplicates(str) {    // 여기에 로직 작성 
        console.log(str);
        let obj = {};

        for (const value of str) {
            obj[value] = (obj[value] || 0) + 1;
        }

        let result = {};

        for (const key in obj) {
            if (obj[key] >= 4) {
                result[key] = obj[key];
            }
        }
        console.log('>>>', result)
        return result;

    }

    // es6 부터 허용되는 문법 
    // function findQuadrupleDuplicates(str) {
    //     const count = {};
    //     [...str].forEach(ch => count[ch] = (count[ch] || 0) + 1);
    //     return Object.fromEntries(Object.entries(count).filter(([k, v]) => v >= 4));
    // }
