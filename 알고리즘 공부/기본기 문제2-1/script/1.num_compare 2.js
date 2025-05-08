/**
 * 
 * *문제 1: 숫자 비교**

 *  사용자로부터 두 개의 숫자를 입력받고, 
    첫 번째 숫자가 두 번째 숫자보다 크면 "첫 번째 숫자가 더 큽니다."라고 출력하고, 
    그렇지 않으면 "두 번째 숫자가 더 큽니다."라고 출력하는 프로그램을 작성해보세요.
 */

    // TODO: 1. 사용자로부터 두 개의 숫자 입력받기.
    let num1 = prompt('첫번째 숫자를 입력해주세요.', '');
    let num2 = prompt('두번째 숫자를 입력해주세요.', '');
    num1 = Number(num1);
    num2 = Number(num2);

    // TODO: 2. 첫번째 입력한 숫자와 두번째 숫자 비교
    switch (true) {
        case num1 > num2:
            alert('첫 번째 숫자가 더 큽니다.');
            break;
        case num1 < num2:
            alert('두 번째 숫자가 더 큽니다.');
            break;
        case num1 === num2:
            alert('두 숫자가 갘습니다.');
            break;
        default:
            alert('숫자를 입력하세요.');
    }