/**
 * 
### 1. **문자열 압축기**

    > 연속된 문자를 숫자로 압축 (`aaabbc` → `a3b2c1`)

    - 입력: `"aaabbc"`
    - 출력: `"a3b2c1"`

    ### 조건

    - `for`, `if`, `+=`, `charAt`, `length` 사용
    - 빈 문자열 입력 시 `"입력값 없음"` 출력

 */

    const str = "aaabbc";
    let str2  = '';
    let obj = {};
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        let char = str.charAt(i);
        if (obj[char]) {
            obj[char]++;
        } else {
            obj[char] = 1;
        }
        
    }

    // entries object 에 key : value 의 값을 반복해서 돌면서 가져오기
    for (const [key, value] of Object.entries(obj)) {
        let objStr = `${key}${value}`;
        str2 += objStr;
    }

    document.writeln('result: ', str2);

   