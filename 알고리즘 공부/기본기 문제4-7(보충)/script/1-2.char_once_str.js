/**
 * 1-2.

    - **문제:**  
        문자열에서 **한 번만 등장하는 문자**를 모두 추출하여 **내림차순 정렬된 배열**로 반환하세요.
        
        
    ```javascript
    const str = "aabbccdde";  
    console.log(findSingleOccurrence(str)); // ["e"]  

    function findSingleOccurrence(str) {     // 여기에 최적화된 로직 작성

    }

 */

    const str = "aabbccdde";  
    console.log(findSingleOccurrence(str)); // ["e"]  

    function findSingleOccurrence(str) {     // 여기에 최적화된 로직 작성
        let obj = {};
        let arr = [];

        for (const key of str) {
            obj[key] = (obj[key] || 0) + 1;
        }

        for (const key in obj) {
            if (obj[key] === 1) {
                arr = key;
            }
        }
        
        return arr;
    }
