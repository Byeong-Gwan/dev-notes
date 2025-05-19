/**
 * 1-1.

    - **문제:**  
        문자열에서 **중복된 문자만 추출**하고, 해당 문자의 **마지막 인덱스**를 `{ 문자: 인덱스 }` 형식으로 반환하세요.  
        (문자는 오름차순 정렬된 상태여야 함)
        
        
    ```javascript
    const str = "abbaccdde";  
    console.log(findDuplicatesAndLastIndex(str)); // { "a": 3, "b": 2, "c": 5, "d": 7 }  

    function findDuplicatesAndLastIndex(str) {     // 여기에 최적화된 로직 작성 

    }
    ```    
 */

    const str = "abbaccdde";  
    console.log(findDuplicatesAndLastIndex(str)); // { "a": 3, "b": 2, "c": 5, "d": 7 }  

    function findDuplicatesAndLastIndex(str) {     // 여기에 최적화된 로직 작성 
        const countObj = {};
        const lastIndexObj = {};

        // 문자열 순회하면서 각 문자의 등장 횟수와 마지막 인덱스 기록
        for (let i = 0; i < str.length; i++) {
            const char = str[i];

            // 등장 횟수 기록
            countObj[char] = (countObj[char] || 0) + 1;

            // 마지막 인덱스 기록
            lastIndexObj[char] = i;
        }

        // 중복된 문자만 필터링하고, 정렬하여 결과 객체 생성
        const result = {};
        Object.keys(lastIndexObj).sort().forEach(char => {
            if (countObj[char] > 1) {
                result[char] = lastIndexObj[char];
            }
        });

        return result;
    }