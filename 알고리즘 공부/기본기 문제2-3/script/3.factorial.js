/**
 * 
### **3. 팩토리얼 함수 구현 (재귀 사용 금지)**
    > 숫자 N을 입력받아, **N! (팩토리얼)** 결과를 출력하세요.
    - 입력: `5`
    - 출력: `120`
    ### 조건
    - 반복문으로 직접 계산 (재귀 X)
 */

    let factorialNum = prompt('숫자를 입력하세요.', '');
    factorialNum = Number(factorialNum);

    const arr = [];
    let sum = 1; 
    for (let i = 0; i < factorialNum; i++) {
        arr[i] = i + 1;

    }

    for (let i = 0; i < arr.length; i++) {
        sum *= arr[i];
    }


document.writeln('팩토리얼 값: ', sum);