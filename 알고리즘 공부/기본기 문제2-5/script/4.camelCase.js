/**
 * 
## 4. **카멜케이스 변환기**

    > 문자열을 **카멜케이스(camelCase)** 형식으로 변환하세요.

    - 입력: `"hello world example"`
    - 출력: `"helloWorldExample"`

    ### 조건

    - 대소문자 조작 직접 구현
    - `split`, `toUpperCase`, `toLowerCase` 사용 가능
 */

    const inputString = "hello world example";
    const arr = inputString.split(' ');
    let tempStr = '';

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] !== '') {
            tempStr = arr[i][0].toUpperCase() + arr[i].slice(1);
            arr[i] = tempStr;
        }
    }
    document.writeln(arr.join(' '));