/**
 * 
#### **8. 숫자를 반대로 뒤집기**
    💡 숫자를 입력받아 **반대로 뒤집은 숫자를 출력하는 프로그램**을 작성하세요.

    `입력: 12345 출력: 54321`

    📌 문자열 변환 없이 숫자로 처리하는 방법도 고민해 보세요.

 */

    const arrNum = [1, 2, 3, 4, 5];

    arrNum.sort(function (a, b) {
        return b - a;
    });

    document.writeln('arr sort:: ', arrNum);

