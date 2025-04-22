/**
 * 
 **문제 8: 1부터 100까지 출력**

 * 1부터 100까지 숫자 중, 3의 배수만 출력하는 프로그램을 작성하세요.
 */

    let num = prompt('숫 자를 입력하세요.', '');
    Number(num);

    if (!isNaN(num)) {
        for (let i = num; i <= 100; i++) {
            // i = num
            if(i % 3 === 0) {
                document.write(i + '<br>');
                // num = num * 3 
                
            }
            
        } 
    
    } else {
        alert('1 ~ 100 중에 하나를 입력하세요.');
    }

    // 100이상 작성시 else if (i => 100) {
            // alert('100이하만 작성해주세요.')
        // }
// 어떻게 처리해야될지...
    