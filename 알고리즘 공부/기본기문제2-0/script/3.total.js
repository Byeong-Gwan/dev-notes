/**
 * **문제 3: 합계 계산기**

 * 사용자로부터 여러 개의 숫자를 입력받아 그 합을 구하는 프로그램을 작성하세요. 
    사용자가 "끝"이라고 입력할 때까지 숫자를 입력받고, 
    "끝"을 입력하면 합을 출력합니다.

    (여러숫자를 입력받는걸 어떻게해야될지 몰라서 버튼을 만들어서 처리)
 */

    function sum(a, b) {
        console.log('a+b = ', a + b);
      
        console.log(' Number(a)',  Number(a) + Number(b));
        console.log(' Number(b)',  Number(b));
  
        return Number(a)+ Number(b);
    }

   
    let num3 = document.getElementById('num3');

    let sumBtn = document.getElementById('sum');
    let end = document.getElementById('end');

    // TODO: 2. 입력받은 숫자
    // let inputNum1 = prompt('숫자를 입력하세요.', '');
    // let inputNum2 = prompt('숫자를 입력하세요.', '');
   
    sumBtn.addEventListener('input', () => {
         // TODO: 1. 사용자로부터 여려 숫자를 입력받아 그 합을 구함
    let num1 = document.getElementById('num1');
    let num2 = document.getElementById('num2');
        
    console.log(num1);console.log(num2);console.log(num3);

    num3 = sum(num1.val, num2.val)
    });
    
    