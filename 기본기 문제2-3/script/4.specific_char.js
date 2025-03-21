/**
 * 
### **4. 특정 문자 개수 세기**
    > 문자열에서 **특정 문자가 몇 번 나왔는지** 카운트하세요.

    - 입력: `"hello world"`, 문자: `'l'`
    - 출력: `3`

    ### 조건

    - 반복문 + 조건문으로 직접 구현

 */

    let inputChar = prompt('찾고 싶은 글자 하나를 입력하세요.','');
    const inputString = "hello world";
    let count = 0;

    for (let i = 0; i < inputString.length; i++) {
        if (inputString[i] === inputChar) {
            count++; 
        }
    }

    document.writeln('count: ', count);
