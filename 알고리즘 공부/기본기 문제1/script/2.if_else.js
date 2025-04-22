/*
    **문제:**  
    사용자로부터 숫자 하나를 입력받아,

    - **짝수면** "짝수입니다."
    - **홀수면** "홀수입니다."  
        를 출력하는 프로그램을 만들어보세요.
*/

// undefined 도 같이 출력됨 이유 확인 필요

// TODO: 사용자로부터 숫자 하나를 입력받는다.
let num = prompt("숫자를 입력하세요.", '');
 // 입력받은 숫자를 number 로 타입 변환

// TODO: num을 2로 나누면 0으로 떨어지면 짝수 아니면 홀수

let result;
if (num % 2 === 0) {
    result = document.write('짝수입니다.', `입력한 숫자: ${num}`);
} else if(num === null || num === undefined) {
    num = prompt("숫자를 입력하세요.", '');
    if (num % 2 === 0) {
        result = document.write('짝수입니다.', `입력한 숫자: ${num}`);
    } else {
        result = document.write('짝수입니다.', `입력한 숫자: ${num}`);    
    }
} else {
    result = document.write('홀수입니다.', `입력한 숫자: ${num}`);
}
console.log(result);

document.write(result);