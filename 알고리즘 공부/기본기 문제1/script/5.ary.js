/**
 * **문제:**  
다음 배열이 있습니다.

js

복사편집

`const fruits = ["사과", "바나나", "오렌지", "포도", "수박"];`

1. 배열의 길이를 출력하세요.
2. 배열의 첫 번째 요소와 마지막 요소를 출력하세요.
3. 새로운 과일 `"딸기"`를 배열의 끝에 추가하고, 변경된 배열을 출력하세요.

 */

// TODO: 1. 배열의 길이
const fruits = ["사과", "바나나", "오렌지", "포도", "수박"];

let result = fruits.length;
let firstFruits = fruits[0];
let lastFruits = fruits[fruits.length - 1];

document.writeln(result);

// TODO: 2. 배열의 첫번째 요소와 마지막 요소만 출력
document.write('<hr>첫번째요소와 마지막 요소만 출력: ', firstFruits + ', ' + lastFruits);

// TODO: 3. '딸기' 배열 마지막에 추가하고 배열 출력
fruits.push('딸기');

document.write('<hr>과일 추가: ', fruits);

