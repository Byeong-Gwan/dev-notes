/**
 *  
### **5️⃣ 괄호 짝 검사기 (심화)**

    > 입력된 문자열에서 **`(`, `)`의 짝이 올바르게 맞는지 검사하는 프로그램**을 작성하세요.
    > 
    > - 입력: `"(()())"`
    >     
    > - 출력: `"올바른 괄호입니다."`
    >     
    > - 입력: `"(()))"`
    >     
    > - 출력: `"올바르지 않은 괄호입니다."`
    >     

    #### ✅ **조건**

    - `for`문과 `변수`를 사용하여 개수를 비교할 것
        
    - **스택(`stack`) 사용 금지**
        
    - 닫는 괄호 `")"`가 더 많아지는 순간 바로 `"올바르지 않은 괄호입니다."` 출력
 */

    // ** 비효율적인 로직 효율적으로 작성하는 방법 익혀야함 **
    // let inputStr = prompt('괄호를 알맞게 일력하세요.', '');
    // let arr = [];
    // let start = 0;
    // let end = 0;
    
    // function inputResult (element) {
    //     for (let i = 0; i < element.length; i++) {
    //         let char = element.charAt(i);
    //         // if (char !== "(" || char !== ")") {return;}
            
    //         console.log(char);
    //         arr.push(char);
            
    //     }
    //     console.log(arr);
    // }

    // arr.forEach((e) => {
    //     if (e === "("){start++} else if (e === ")") {end++}
    // });

    // if (start === end) {
    //     alert('올바른 괄호입니다.');
    // } else {
    //     alert('올바르지 않은 괄호입니다.')
    // }

    let inputStr = prompt('괄호를 입력하세요.', '');
    let openCount = 0; // '(' 개수

    for (let i = 0; i <inputStr.length; i++) {
        let char = inputStr.charAt(i);

        if (char === '(') {
            openCount++; // 여는 괄호 증가
        } else if (char === ')') {
            openCount--; // 닫는 괄호 감소

            // 닫는 괄호가 더 많아지는 순간, 즉시 잘못된 괄호 판단
            if (openCount < 0) {
                alert('올바르지 않은 괄호입니다.');
                break;
            }
        }
    }

    // 최종적으로 openCount가 0이면 올바른 괄호
    if (openCount === 0) {
        alert('올바른 괄호입니다.');
    } else if (openCount > 0) {
        alert('올바르지 않은 괄호입니다.');
    }