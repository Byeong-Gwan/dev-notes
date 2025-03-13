/**
 * 
 **📝 2. 1부터 N까지 합 구하기**

 * 사용자가 입력한 숫자 N까지의 합을 구하는 프로그램을 작성하세요.  
💡 **입력:** `5` → **출력:** `1 + 2 + 3 + 4 + 5 = 15`

 */

   let arrNum = [];

   // TODO: 1. 사용자로부터 N번 숫자 입력 받기
   let num = prompt('더할 숫자 입력해주세요.');


   // TODO: 2. N까지 합하기.

console.log('eeeeee', num)
console.log('arr1', arrNum[0]);
   /**
    * "완료" 입력하기전까지 작성한 숫자 모두 합산
    */

   arrNum.push(num);
   console.log('arr2', arrNum[0]);

   if (num !== '완료') {
      arrNum.map(() => {
         num = prompt('더할 숫자 입력해주세요.');
         num = Number(num);
         arrNum.push(num);
         let i = 0;
         console.log("num", num[0]);
         let sum = num[i] +   num[i+1];
         i++;
         document.write(sum);
         console.log("i", i);
         console.log("num", num.length);
         console.log("num", num[0]);
         console.log("num1", num[1]);
      })
   }

   