/**
 * ### 🧩 3️⃣ 대소문자 반전하기

**문제**  
주어진 문자열에서 소문자는 대문자로, 대문자는 소문자로 바꿔서 반환하세요.

    - 입력: `"AbCdE"`
        
    - 출력: `"aBcDe"`
        

    📌 조건:

    - `for`, `charCodeAt`, `String.fromCharCode` 사용 가능
        
 */

    console.log(invertCase("AbCdE"));

    function invertCase (str) {
        let result = '';

        for (let i = 0; i < str.length; i++) {
            if (str.charAt(i) === str.charAt(i).toLowerCase()) {
                result += str.charAt(i).toUpperCase();
            } else {
                result += str.charAt(i).toLowerCase();
            }
        }
        return result;
    }