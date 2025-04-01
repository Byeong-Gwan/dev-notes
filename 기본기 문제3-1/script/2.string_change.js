/**
 * 
## **📌 2️⃣ 문자열 변환 문제 (문자 개수 세기)**

**📝 문제:**  
사용자가 입력한 문자열에서 **각 문자가 몇 번 등장했는지** 개수를 세어 출력하는 함수를 작성해라.  
(대소문자 구분 X)

    **🔹 입력 예시:**


    `let input = "Hello World"; console.log(countCharacters(input));`

    **🔹 출력 예시:**

    `{   h: 1,   e: 1,   l: 3,   o: 2,   w: 1,   r: 1,   d: 1 }`

    **✔ 조건:**

    - **`for`문과 객체 `{}`를 활용**해서 문자 개수를 저장할 것
        
    - `toLowerCase()`를 사용해서 **대소문자 구분 없이 처리**할 것
        
 */

    let input = "Hello World"; 
    console.log(countCharacters(input));

    function countCharacters(e) {
        let obj = {};
        let maxCount = 0;
        let maxChar = '';

        for (let i = 0; i < e.length; i++) {
            let char = e[i].toLowerCase();

            if (char === ' '){continue;}

            obj[char] = (obj[char] || 0) + 1;

            if (obj[char] > maxCount) {
                maxCount = obj[char];
                maxChar = char;
            
            }
        }

        return obj;
    }