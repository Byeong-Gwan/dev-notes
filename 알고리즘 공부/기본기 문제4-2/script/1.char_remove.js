/**
 * ### 🧩 1️⃣ 문자 제거하기

**문제**  
주어진 문자열에서 지정한 문자를 모두 제거하세요.

    - 입력: `"javascript"`, `"a"`
        
    - 출력: `"jvscript"`
        

    📌 조건:

    - `for`, `charAt` 사용
        
    - `replace` 금지
 */

    console.log(charRemove('javascript', 'a'));

    function charRemove (str, char) {
        let result = '';

        for (let i = 0; i < str.length; i++) {
            if (str.charAt(i) !== char) {
                result += str.charAt(i);
            }
        }
        return result;
    }