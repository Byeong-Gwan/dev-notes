/**
 * 
#### **6. 숫자 맞추기 게임 (고급 버전)**
    💡 1~100 사이의 랜덤 숫자를 생성하고, 사용자가 이 숫자를 맞힐 때까지 반복하는 프로그램을 작성하세요.

    - 숫자가 정답보다 크면 `"너무 큽니다!"`
    - 숫자가 정답보다 작으면 `"너무 작습니다!"`
    - 맞히면 `"정답입니다! 시도 횟수: X"`를 출력하세요.

 */

    // TODO: 1. 1~100 사이의 난수를 가져옴
    const computerNum = Math.floor(Math.random() * 100 + 1);
    console.log('computerNum:: ', computerNum);

    // TODO: 2. 사용자로 부터 입력받은 데이터 숫자로 변환
    let inputNum = prompt('숫자를 입력하세요', '');
    
    // TODO: 3. 정답을 마추기위한 시도 횟수 저장
    let i = 0;

    // 반복하는 동안 처리
    while (true) {
        i++; // 증감 (횟수)
        inputNum = Number(inputNum);
        
        // 숫자만 입력 가능 
        if (isNaN(inputNum)) {
            alert('숫자만 입력할 수 있습니다.');
            break;
        }

        // 입력한 데이터와 난수가 같은지 여부 확인
        if (computerNum > inputNum) {
            inputNum = prompt('입력한 숫자가 작습니다.');
        } else if (computerNum < inputNum) {
            inputNum = prompt('입력한 숫자가 큽니다.');
        } else {
            alert('정답입니다.!');
            // 정답일 때만 출력
            document.writeln('정답: ', computerNum); // 난수 값
            document.writeln('<br>시도 횟수: ', i); // 시도한 횟수
            break;
        }
    }
     