/**
 * 
 * ## **📌 1️⃣ 문자열 뒤집기 (기본)**

**📝 문제:**  
사용자가 입력한 문자열을 **뒤집어서 반환하는 함수**를 만들어라.  
(예: `"hello"` → `"olleh"`)

    **✔ 조건:**

    - `for`문을 사용해서 직접 문자열을 뒤집을 것
        
    - `reverse()`, `split()`, `join()` 사용 금지
        

    **🔹 입력 예시:**

    `console.log(reverseString("hello"));`

    **🔹 출력 예시:**

    `"olleh"`

 */

    console.log(reverseString("hello"));

    function reverseString(str) {
        // let arr = [];
        let reversed = '';

        for (let i = str.length - 1; i >= 0; i--) {
            // arr.push(str.charAt(i)); 
            reversed += str.charAt(i); // 메모리 사용 줄임
        }
        // return arr.join('');
        return reversed;
    }