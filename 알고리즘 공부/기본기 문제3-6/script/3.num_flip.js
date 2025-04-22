/**
 * ### 🧩 **3️⃣ 숫자를 거꾸로 뒤집기 (숫자 연산만)**

    > 숫자를 받아 뒤집은 숫자를 반환하세요.  
    > **(문자열 변환 없이 숫자만으로 구현)**

    - 🔹 입력: `12345`
        
    - 🔹 출력: `54321`
        

    📌 반복문 + 나머지(%) + 나누기(/) 활용
*/

console.log(numFlip(12345));

/**
 * 문자열 전환 없이 처리 방법
 */
function numFlip (num){
    let result = 0;

    while(num > 0) {
        let flip = num % 10;
        result = result * 10 + flip;
        num = Math.floor(num/10);
    }
    return result;
}