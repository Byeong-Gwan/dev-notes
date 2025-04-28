/**
 * 
### 3️⃣ 문자열 압축하기 (심화)

**문제**  
주어진 문자열을 연속된 문자와 개수로 압축하세요. (대소문자 구분)

    - 입력: `"aaAAAbbBB"`
        
    - 출력: `"a2A3b2B2"`
        

    📌 조건:

    - `for`, `charAt`, `length`만 사용
        
    - 소문자/대문자 다르게 취급
        
 */

    console.log(strCompressing("aaAAAbbBB"));

    function strCompressing (str) {
        let result = '';
        let count = 1;

        for (let i = 0; i < str.length; i++) {
            if (str[i] === str[i+1]) {
                count++;
            } else {
                result += str[i] + count;
                count = 1;
            }
        }
        return result;
    }