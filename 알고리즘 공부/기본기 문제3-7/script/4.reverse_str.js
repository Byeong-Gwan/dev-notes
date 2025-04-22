/**
 * 
### ✅ 4️⃣ 문자열 뒤집기

    > 주어진 문자열을 뒤집은 새 문자열을 반환하세요.

    - 입력: `"hello"`
        
    - 출력: `"olleh"`
        
    `function reverseStr(str) {   // 구현 } console.log(reverseStr("hello"));`

 */

    function reverseStr(str) {
        const arr = str.split('');
        return arr.reverse().join('');
    }

    console.log(reverseStr("hello"));