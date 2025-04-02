/**
 * 
## **📌 3️⃣ 중복 문자 제거하기 (중급)**

**📝 문제:**  
사용자가 입력한 문자열에서 **중복된 문자를 제거하고** 남은 문자만 반환하는 함수를 작성하라.

    **✔ 조건:**

    - `for`문과 객체 `{}`를 활용할 것
        
    - 같은 문자가 여러 번 나오면 **첫 번째 등장한 문자만 유지**
        
    - `Set()` 사용 금지
        

    **🔹 입력 예시:**

    `console.log(removeDuplicates("banana"));`

    **🔹 출력 예시:**

    `"ban"`

 */

    console.log(removeDuplicates("banana"));

    function removeDuplicates (str) {
        let obj = {};
        let arrStr = '';

        for (let i = 0; i < str.length; i++) {
            let char = str[i];
            
            if (!obj[char]) { // 객체가 없을 때만 추가
                obj[char] = true;
                arrStr += char; // 문자열에 추가
            }
        }

        return arrStr;
    }