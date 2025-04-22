/*
*
#### **4. 숫자를 한글로 변환하기**
    - [ ]
    💡 0~9까지의 숫자를 입력받으면 한글(영 -> 일, 이, 삼...)로 변환하여 출력하는 프로그램을 작성하세요.
        예를 들어 `7`을 입력하면 `"칠"`이 출력되어야 합니다.

    - `switch` 문 또는 객체를 활용해 해결해 보세요.
*/
const arrNum = {1: '일', 2: '이', 3: '삼', 4: '사', 5: '오', 6: '육', 7: '칠', 8: '팔', 9: '구'};

let inputValue = prompt('숫자(0~9)를 입력하세요.', '');
inputValue = Number(inputValue);

if (!isNaN(inputValue)) {
    // arrNum 안에 inputValue 값이 있는지 확인
    if (inputValue in arrNum) {
        document.write('입력한 숫자는: ', arrNum[inputValue]);
    } else {
        alert('0~9까지의 숫자만 입력하세요.');
    }
} else {
    alert('숫자만 입력하세요.');
}

