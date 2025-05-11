/**
 * 
### **3️⃣ 가장 많이 등장한 문자와 횟수 반환**

> 🔹 _개념_: 객체 생성 + 최대값 추출  
> 🔹 _난이도_: ★★★★☆

**문제**  
문자열에서 가장 많이 등장한 문자와 그 횟수를 `{ 문자: 횟수 }` 형식의 객체로 반환하세요.  
(동점일 경우, 알파벳 순으로 먼저 나오는 문자 우선)

    `const str = "aaabbccccd";`

    - 출력: `{ c: 4 }`
        
 */

    const str = "aaabbccccd";
    console.log(charCount(str));

    function charCount (str) {
        let obj = {};
        let maxCount = 0;
        let result = {};

        for (const value of str) {
            // 1. 문자 등장 횟수 기록
            obj[value] = (obj[value] || 0) + 1;
            console.log(obj[value]);
            
            // 2. 최대값 갱신 및 결과 업데이트
            if (obj[value] > maxCount) {
                maxCount = obj[value];
                result = {[value]: maxCount};
            }

            // 예외: 동점일 경우, 알파벳 순으로 먼저 나오는 문자 우선
            else if (obj[value] === maxCount) {
                const currentChar = Object.keys(result)[0];
                if (value < currentChar) {
                    result = { [value]: maxCount };
                }
            }
        }
        return result;
    }