/**
 * 
 **🔥 3. 배열에서 짝수만 골라 출력하기**

 * 배열 `[10, 21, 33, 42, 55, 60]`에서 **짝수만 출력**하세요.  
💡 
    **출력:** `10, 42, 60`
 */

    const arr = [10, 21, 33, 42, 55, 60];
    const arrEven = [];

    arr.forEach((element) => {
        if (element % 2 === 0) {
            arrEven.push(element);
        }
    })

    document.write('짝수: ', arrEven);