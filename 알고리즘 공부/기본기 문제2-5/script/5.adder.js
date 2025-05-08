/**
 * 
## 5. **간단한 계산기**

    > 숫자 두 개와 연산자(+, -, *, /)를 입력받아 **결과 계산** 출력

    - 입력: `5`, `*`, `6`
    - 출력: `결과: 30`

    ### 조건

    - prompt 3회 입력
    - `switch` 문 활용
    - 잘못된 연산자 입력 시 오류 출력

 */

    let num1 = prompt('숫자를 입력하세요.', '');
    let operation = prompt('+ - * / 중 하나를 넣어주세요.', '');
    let num2 = prompt('계산할 숫자를 입력하세요.');
    let result;

    num1 = Number(num1);
    num2 = Number(num2);

    if (isNaN(num1) || isNaN(num2) || (operation !== '+' || operation !== '-'|| operation !== '*'|| operation !== '/')) {
        alert('형식에 맞게 입력하세요.');
    } else {
        switch (true) {
            case operation === '+':
                result = num1 + num2;
                break;
            case operation === '-':
                result = num1 - num2;
                break;
            case operation === '*':
                result = num1 * num2;
                break;
            case operation === '/':
                result = num1 / num2;
                break;
        }
    }

    document.writeln('결과 값: ', result);