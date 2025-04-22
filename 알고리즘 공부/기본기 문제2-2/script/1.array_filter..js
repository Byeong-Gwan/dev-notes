/**
 * 
 **1. 배열 필터링 및 정렬**

 * 💡 사용자로부터 여러 개의 숫자를 입력받아 배열에 저장한 뒤, **짝수만 골라서 내림차순 정렬**하여 출력하는 프로그램을 작성하세요.

   - `prompt()`를 활용하여 입력받고, **숫자가 아닌 입력은 무시**하세요.
   - `filter()`와 `sort()`를 활용해 보세요.
 */
   
   // TODO: 1. 사용자가 입력한 데이터 담을 그릇
   let inputArr = [];
   
   // TODO: 2. 문자열이 나오기 전까지 반복
   while (true) {
      // 사용자로 부터 입력받기
      let inputNum = prompt('숫자를 입력하세요.<br>(단, 숫자 이외는 무시됩니다.)');
      // 문자로 넘어노는 값을 형변환 시켜줌
      inputNum = Number(inputNum);
      // 받은 데이터 담기
      inputArr.push(inputNum);

      // 숫자가 아니면 종료
      if (isNaN(inputNum)) {
         break;
      }
      
      // filter를 통해서 result에 배열을 얕은 복사
      const  result = inputArr.filter((num) => {
         let i = 0;
         i > num.length;
         i++;
         return num;
      });

      // result에 받은 데이터가 숫자가 아니면 넘어가서 반복문 수행
      if (isNaN(result)) {
         continue;
      }
   }
   // 얕은 복사를 통해 받은 데이터 정렬
   result.sort();
   
   // 정렬한 데이터 출력
   document.write('array is sort: ', result);