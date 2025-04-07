/**
 * 
### 🧩 2️⃣ **문자열 대소문자 변환기**
    * 문자열을 입력받아, 소문자는 대문자로, 대문자는 소문자로 변환하여 출력하세요.
        * 📌 조건  * - 한 글자씩 검사해서 바꿔야 함 (toUpperCase, toLowerCase 사용 가능)
        * 🔹 입력 예시: "Hello WoRLd"  
        * 🔹 출력 예시: "hELLO wOrlD"  
*/

const inputStr = prompt('입력해주세요.', '');

console.log("결과 값: ", inputChange(inputStr));

function inputChange (str) {
    return str.split('').map(char => {
        return char === char.toLowerCase() ? char.toUpperCase() : char.toLowerCase();
    }).join('');
}
