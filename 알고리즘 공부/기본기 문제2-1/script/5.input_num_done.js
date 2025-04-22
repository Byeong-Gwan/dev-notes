/**
 * 
 **🔥 5. "완료" 입력 시 종료되는 숫자 입력 프로그램**

 * 사용자가 숫자를 입력하면 계속 더하다가 `"완료"`를 입력하면 종료하는 프로그램을 작성하세요.  

    💡 **입력:** `10 → 5 → 7 → 완료` → **출력:** `총합: 22`
 */

    // TODO: 1. 입력받은 데이터
    let sum = 0;

    while(true) {
        let inputSum = prompt('숫자를 입력해 주세요.', '');

        if (inputSum === '완료') {
            break;
        }
        if (inputSum === isNaN()) {
            break;
        }
        inputSum = Number(inputSum);
        sum += inputSum;
    }

    document.write('합계: ', sum);