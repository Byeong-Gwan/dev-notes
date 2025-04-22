/**
 * 
 **문제 5: 배열에서 최대값 찾기**

 * 다음 배열에서 최대값을 찾아 출력하는 프로그램을 작성하세요.
    javascript
    <복사편집>
    `const numbers = [12, 45, 7, 33, 80, 29];`

 */

    const numbers = [12, 45, 7, 33, 80, 29];
    let max = numbers[0];
    for(let i =0; i < numbers.length; i++) {
        
        if(numbers[i] > max) {
            max = numbers[i];
            
        }
        
    }
    document.write('최대값: ', max);