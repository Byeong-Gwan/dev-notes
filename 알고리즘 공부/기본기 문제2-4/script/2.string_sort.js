/**
 * 
## 2. **문자열 정렬 – 단어별 알파벳 순 정렬**

    > 문자열의 각 단어를 **알파벳 순으로 정렬** 후 다시 문자열로 반환하세요.

    - 입력: `"hello world"`
    - 출력: `"ehllo dlorw"`

    ### 조건

    - `split`, `sort`, `join` 직접 활용
    - 공백 기준으로 단어 나누고 각 단어 정렬

 */

    const inputStr = "hello world";

    const str = inputStr
                .split(' ')
                .map(element => element.split('').sort().join(''))
                .join(' ');
    
    document.writeln('sort:: ', str);