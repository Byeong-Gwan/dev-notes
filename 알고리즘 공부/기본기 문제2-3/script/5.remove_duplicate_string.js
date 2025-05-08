/*
*
#### **5. 중복 문자 제거하기**
    - [ ]
    💡 문자열을 입력받아 **중복된 문자를 제거**한 후 출력하는 프로그램을 작성하세요.

    `입력: "banana" 출력: "ban"`

    📌 `indexOf()` 또는 `split()`, `join()`을 활용할 수 있습니다.
*/


let inputValue = prompt('문자열을 입력하세요.', '');
let result = '';

for (let i = 0; i < inputValue.length; i++) {
    // inputValue[i] 의 값이 없으면 result 에 추가하고, 있으면 result 에 추가하지 않음
    if (result.indexOf(inputValue[i]) === -1) {
        result += inputValue[i];
    }
}
document.write('중복 제거한 문자열: ', result);
