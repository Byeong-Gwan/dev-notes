/*

### 3. **숫자 자리수 합산기**

    > 숫자를 입력받아 각 자리 수를 더한 값 출력

    - 입력: `512`
    - 출력: `합계: 8` (`5 + 1 + 2`)

    ### 조건

    - `prompt`로 입력, `split` 금지
    - `String()`, `Number()`, `for` 사용

*/

    let promp = prompt('숫자를 입력하세요.', '');
    let str = String(promp);
    let sum = 0;

    num.forEach((element) => {        
        if (isNaN(element)){return;}
        sum += Number(element);
    });

    console.log('num', num);
    console.log('sum', sum);


