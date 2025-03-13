/**
 * 
 **문제 4: 구구단 출력**

 * 구구단 중 원하는 단을 입력받고 해당 단의 구구단을 출력하는 프로그램을 작성하세요.
 */

// TODO: 사용자로부터 구구단 중 입력받음
const don = prompt('1 ~ 9중에 하나를 입력하세요.', '');

// TODO: 2. 입력한 숫자의 구구단 출력
Number(don);

if (!isNaN(don)) {
    for(let i = 1; i < 10; i++) {
        document.write(`${don} * ${i} = ${don * i} <br>`);
    }
} else {
    alert('1 ~ 9 중에 하나를 입력하세요.');
}
