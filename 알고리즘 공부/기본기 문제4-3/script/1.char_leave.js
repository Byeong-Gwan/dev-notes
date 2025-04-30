/**
 * ### 1️⃣ 서로 다른 문자만 남기기

> 주어진 문자열에서 **중복된 문자를 제거**하고,  
> **최초로 등장한 문자만 남긴 문자열**을 반환하세요.

    `// 입력: "abacabad" // 출력: "bcd"`

    📌 조건

    - `for`, `charAt`, `includes` 사용 가능
        
    - **Set 사용 금지**
        
 */

    console.log(charLeave("abacabad"));

    function charLeave (str) {
        // 중복된 값빼고 배열에 넣기 
        // 배열 문자열로 전환 후 return
        let res = [];

        for (let i of str) {
            if (str.indexOf(i) === str.lastIndexOf(i)) {
                res.push(i);
            }
        }
        return res.join('');
    }