/**
 * 
### **2-1. 가장 적게 등장한 문자와 횟수 반환**

> 🔹 _개념_: 객체 생성 + 최소값 추출  
> 🔹 _난이도_: ★★★☆☆

    **문제:**  
    문자열에서 가장 적게 등장한 문자와 그 횟수를 `{ 문자: 횟수 }` 형식으로 반환하세요.

    ```javascript
    const str = "aaabbccccd"; 
    console.log(leastCount(str)); // { "d": 1 }  

    function leastCount(str) {   // 여기에 카운팅 로직 작성 
    ...
    }
    ```
 */

    const str = "aaabbccccd"; 
    console.log(leastCount(str)); // { "d": 1 }  

    function leastCount(str) {   // 여기에 카운팅 로직 작성 
        let obj = {};

        for (const value of str) {
            obj[value] = (obj[value] || 0) + 1;
        }

        // 만들진 Object의 값 중 Value 값이 가장 작은 값을 가져와서 value 값을 담는다.
        let minCount = Math.min(...Object.values(obj));
        let result ={};
        
        for (const key in obj) {
            // 만들어진 object 값을 비교해 min 값과 동일한 값을 찾아 result 객체에 넣어준다.
            if (obj[key] === minCount) {
                result[key] = minCount;
                break;
            }
        }

        return result;
    }