/**
 * **문제:**  
**두 개의 숫자를 입력받아** 두 숫자의 합을 반환하는 함수를 만들어보세요.  
그리고 만든 함수를 사용하여,

> "두 숫자의 합은 [결과]입니다."  
> 라고 출력하세요.

 */

let aInputNum = prompt('a 숫자를 입력하세요.', '');
let bInputNum = prompt('b 숫자를 입력하세요.', '');

aInputNum = Number(aInputNum);
bInputNum = Number(bInputNum);

let inputSum = sum(aInputNum, bInputNum);

document.write(`두 숫자의 합은 ${inputSum}입니다.`);
function sum (a, b) {
    return a + b;
}