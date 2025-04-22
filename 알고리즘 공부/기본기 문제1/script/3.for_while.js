/**
 * **문제:**  
    1부터 100까지 숫자 중에서 **3의 배수만 출력하는 코드**를 작성해보세요.
    (입력받은 숫자의 배수를 100보다 작은 숫자만 노출)
 */

    // TODO: 1. 입력받은 숫자
    let inputNum = prompt('3배수를 알고 싶은 숫자를 입력하세요.', '');
    inputNum = Number(inputNum);
    console.log(inputNum);

    // TODO: 2. 1부터 100까지 3의 배수만 출력
    for (let i = inputNum; i <= 100; i++) {

        if (i % 3 === 0) {
            document.write(inputNum);
        } else if (inputNum === 100) {
            document.write(inputNum);
        } else {
            continue;
        }

        if (inputNum !== 100){
            document.write(', ');
        }
        
        inputNum = inputNum + 3;
    }