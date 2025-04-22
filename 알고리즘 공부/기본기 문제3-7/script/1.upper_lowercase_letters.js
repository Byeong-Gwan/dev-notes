/**
 * ### ✅ 1️⃣ 대소문자 통일기

  > 문자열이 주어졌을 때,  
  > 대문자 수가 더 많으면 전체를 **대문자**로,  
  > 소문자 수가 많거나 같으면 전체를 **소문자**로 바꾸세요.

  - 입력: `"Javascript"`
      
  - 출력: `"javascript"`
      
  `function convertCase(str) {   // 구현 } console.log(convertCase("Javascript"));`
 */

  console.log(convertCase("Javascript"));

  // 최적화 전 코드
  // function convertCase (str) {
  //   let upperCount = 0;
  //   let lowerCount = 0;
  //   const arr = str.split('');
  //   let result = '';
    
  //   for (let i = 0; i < arr.length; i++) {

  //     if (arr[i] === arr[i].toLowerCase()) {
  //       lowerCount++;
  //     } else {
  //       upperCount++;
  //     }
  //   }

  //   if (lowerCount > upperCount){
  //     return result = arr.join('').toLowerCase(); 
  //   } else {
  //     return result = arr.join('').toUpperCase();
  //   }

  // }

  // 최적화를 통해 가독성을 더 높여줌
  function convertCase (str) {
    let upperCount = 0;
    let lowerCount = 0;

    for (let i = 0; i < str.length; i++) {

      if (str[i] === str[i].toLowerCase()) {
        lowerCount++;
      } else {
        upperCount++;
      }
    }

    if (lowerCount > upperCount){
      return str.toLowerCase(); 
    } else {
      return str.toUpperCase();
    }

  }