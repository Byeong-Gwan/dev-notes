/**
 * 
 **문제 2: 홀짝 판별**

 * 사용자로부터 숫자 하나를 입력받고, 
    해당 숫자가 홀수인지 짝수인지 판별하여 출력하는 프로그램을 작성하세요.
 */

    // TODO: 1. 입력받은 숫자
    let num = prompt('숫자를 입력하세요.');
    num = Number(num);
    console.log('num:',!isNaN(num));

    // TODO: 2. 입력받은 숫자가 홀수인지 짝수인지 확인
    if ((num % 2 === 0) && !isNaN(num)) {
        document.write('짝수 입니다.');
    } else if ((num % 2 !== 0) && !isNaN(num)) {
        document.write('홀수 입니다.');
    } else {
        document.write('숫자를 입력해주세요.');
    }