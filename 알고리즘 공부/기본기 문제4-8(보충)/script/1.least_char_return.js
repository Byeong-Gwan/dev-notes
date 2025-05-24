/**
 * 
 * ### ✅ 1. 문자 등장 횟수 분석 유형

#### 원래 문제: 가장 적게 등장한 문자 반환

    > **🔁 연습 문제:**  
    > 문자열에서 **가장 많이 등장한 문자와 그 횟수**를 `{ 문자: 횟수 }` 형태로 반환하세요.

    ```javascript
    const str = "aaabbccccd";   

    console.log(mostCount(str)); // { "c": 4 }

 */

    const str = "aaabbccccd";   

    console.log(mostCount(str)); // { "c": 4 }

    function mostCount (str) {
        let obj = {};

        for (const value of str) {
            obj[value] = (obj[value] || 0) + 1;
        }

        let maxCount = Math.max(...Object.values(obj));
        let result = {};

        for (const key in obj) {
            if (obj[key] === maxCount) {
                result[key] = maxCount;
            }
        }
        return result;
    }