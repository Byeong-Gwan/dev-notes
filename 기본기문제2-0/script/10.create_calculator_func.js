/**
 * 
 **문제 10: 함수로 계산기 만들기**

 * 두 숫자를 입력받고, 더하기, 빼기, 곱하기, 나누기 등의 연산을 수행하는 함수를 각각 작성하세요. 
    각 연산은 별도의 함수로 만들고, 사용자가 선택한 연산을 수행한 결과를 출력하는 프로그램을 작성하세요.
 */

    const num1 = prompt('첫 번째 숫자를 입력해주세요.', '');
    const num2 = prompt('두 번째 숫자를 입력해주세요.', '');
    const calculator = prompt('+, -, *, /, % 등 원하는 연산을 입력하세요.', '');
    Number(num1);
    Number(num2);

    switch (calculator) {
        case '+':
            document.write('num1 + num2 = ' + add(num1, num2));
            break;

        case '-':
            document.write('num1 - num2 ='+ subtract(num1, num2));
            break;

        case '*':
            document.write('num1 * num2 ='+ multiply(num1, num2));
            break;

        case '/':
            document.write('num1 / num2 ='+ divide(num1, num2));
            break;

        case '%':
            document.write('num1 % num2 ='+ remainder(num1, num2));
            break;
    }

    function add(a, b){
        return a + b;
    }

    function subtract(a, b){
        return a - b;
    }

    function multiply(a, b){
        return a * b;
    }

    function divide(a, b){
        if (a === 0 || b === 0) {
            alert('0으로는 나눌 수 없습니다.');    
        }
        return a / b;
    }

    function remainder(a, b){
        return a % b;
    }