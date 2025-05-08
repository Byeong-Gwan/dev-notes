/**
 * 
 **🔥 1. `while` 반복문으로 1부터 N까지 합 구하기**

 * 사용자가 입력한 숫자 `N`까지의 합을 `while`문을 사용하여 구하세요.  

💡 **입력:** `5` → **출력:** `1 + 2 + 3 + 4 + 5 = 15`
 */

   
   let sum = 0; // 합산한 값 담을 그릇

   // 완료 작성 하지 않으면 계속 반복
   while(true) {
      // TODO: 1. 사용자로부터 입력받기.
      let inputNum = prompt('숫자를 입력해주세요.', '');

      // 완료 작성 or 빈 값이면 프로그램 종료
      if (inputNum === '완료' || inputNum === '') {
         break;
      }

      // inputNum 값이 숫자가 아닌지 체크
      if (inputNum === isNaN()){
         alert('숫자를 입력하세요.');
         continue;
      }

      // number로 형변환 
      inputNum = Number(inputNum);

      // 입력한 숫자 합산
      sum += inputNum;
   }

   // 합산한 숫자 출력
   document.write('합계: ',sum);