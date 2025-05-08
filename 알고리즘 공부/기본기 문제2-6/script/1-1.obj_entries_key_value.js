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

    function strCount (element) {
        console.log('eee',element.charAt(0));
        if (element.length === 0) {
            alert('입력 값이 없습니다.');
            return '';
        } else {
            let compressed = '';
            let count = 1;

            for (let i = 0; i < element.length; i++) {
                if (element.charAt(i) === element.charAt(i + 1)) {
                    count++;
                } else {
                    compressed += element.charAt(i) + count;
                    count = 1;
                }
            }
            return compressed;
        }
    }

    const str = "aaabbc";
    document.writeln('<br>result2: ', strCount(str));

   