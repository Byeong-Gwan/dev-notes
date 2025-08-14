// 1. 함수의 의미와 사용법
// 1). 반복될 수 있는 작업을 정의해두는 것
function allArithmetic(a, b) {
    console.log(`${a} + ${b} = ${a + b}`);
    console.log(`${a} - ${b} = ${a - b}`);
    console.log(`${a} * ${b} = ${a * b}`);
    console.log(`${a} / ${b} = ${a / b}`);
    console.log(`${a} % ${b} = ${a % b}`);
}

let a = 3, b = 4
allArithmetic(a, b);

// 2). input을 받아 output을 반환 return 하는 것
function add (x, y) {
    return x + y; // 값을 반환
}

let z = add(2, 3);

console.log(z);
console.log(add(4, 5));
console.log(
    add(add(6, 7), add(8, 9))
);

function isOdd (x) {
    return !!(x % 2);
}

let num = 12;
console.log(
    `${num}(는)은 ${isOdd(num) ? '홀' : '짝'} 수 입니다.`
);

// a. input으로 받는 값 - 인수와 인자
function add(x, y) {
    // x, y를 인자 또는 매개변수(parameter)라 부름
    return x + y;
}

// a, b를 인수(argument)라 부름
let f = add(2, 3);

// - 일반적으로는 굳이 구분하지 않고 혼용해서 사용함

// b. 꼭 인자를 받거나 값을 반환하는 것은 아님
let currentTemp = 24.5;

function logCurrentTemp () {
    console.log(`현재 온도는 섭씨 ${currentTemp}도 입니다.`);
}

console.log('반환값: ', logCurrentTemp());

/**
 * - return 문이 정의되어 있지 않으면 undefined를 반환
 * - console.log 실행 뒤 undefined가 뜨는 이유
 * - 함수 실행 시 함수 내부에 정의된 모든 코드가 실행되고 나서 반환값을 반환하기 때문
 * - 즉, 함수 내부에 정의된 모든 코드가 실행되고 나서 반환값을 반환하기 때문에
 * - 함수 내부에 정의된 모든 코드가 실행되고 나서 반환값을 반환하기 때문에
 * - 함수 내부에 정의된 모든 코드가 실행되고 나서 반환값을 반환하기 때문에
 */

// c. return 문은 꼭 마지막에
function add (x, y) {
    console.log(`${x}와 ${y}를 더합니다.`);
    return x + y;
    console.log(`결과는 ${x + y}입니다.`);
}

// d. 호이스팅 hoisting
// 함수는 실행문보다 나중에 정의하는 것이 가능
// 변수나 상수는 불가능! (var 제외)
console.log(add(2, 7));

function add (x, y) {
    return x + y;
}

// 2. 함수를 정의하는 방법들

// 1). 함수 선언
function add (x, y) {
    return x + y;
}

console.log(add(2, 7));

// 2). 상수나 변수에 함수 대입 함수도 값
const subt = function (x, y) {
    return x - y;
}

console.log(subt(7, 2));

// 기존의 함수를 재정의하는 것도 가능
add = function (x, y) {
    console.log(`${x}와 ${y}를 더합니다.`);
    console.log(`결과는 ${x + y}입니다.`);
    return x + y;
}

console.log(add(2, 7));

// 3). 화살표 함수
const mult1 = (x, y) => x * y;

console.log(mult1(2, 7));

// 두 줄 이상의 작업이 있을 시
const mult2 = (x, y) => {
    console.log(`${x}와 ${y}를 곱합니다.`);
    console.log(`결과는 ${x * y}입니다.`);
    return x * y;
};

console.log(mult2(2, 7));

// 인자가 하나일 때는 괄호 없이 선언 가능
const pow = x ** 2;
console.log(pow(3));
// * 화살표 함수는 function 선언한 함수와 기능 차이가 있음 이후 다름

// 2). 번과 3). 번 방법으로 선언한 함수는 호이스팅되지 않음
console.log(div(8, 4));

const div = (x, y) => x / y;

// 함수 생성 시점이 다르기 때문
// - 1번 방법으로 정의된 함수는 엔진의 코드 실행 이전 미리 생성됨