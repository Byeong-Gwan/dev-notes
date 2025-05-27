/**
 * 
### ✅ 5. 인덱스 차이 계산

#### 원래 문제: 중복 문자 첫/끝 인덱스 차이 계산

    > **🔁 연습 문제:**  
    > 문자열에서 중복 문자의 **첫 번째 등장과 두 번째 등장 간의 거리**를 계산하세요.  
    > (한 번만 등장한 문자는 제외)

    ```javascript
    const str = "abcbade";   

    console.log(findFirstSecondDiff(str)); // { "a": 4, "b": 2 }

 */

    const str = "abcbade";   

    console.log(findFirstSecondDiff(str)); // { "a": 4, "b": 2 }

    function findFirstSecondDiff (str) {
        const countObj = {};
        const firstObj = {};
        const lastObj = {};

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
            if (countObj[char] > 1){
                result[char] = lastObj[char] - firstObj[char];
            }
        });

        return result;
    }