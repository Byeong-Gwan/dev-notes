/**
 * 
### 🧩 **1️⃣ 문자 포함 여부 판별기**

  > 주어진 문자열에 특정 문자가 포함되어 있는지 확인하세요.

  - 🔹 입력: `"javascript", "s"`
      
  - 🔹 출력: `"포함됨"` 또는 `"포함되지 않음"`
      

  📌 `for`, `if`, `return`, `charAt()` 등 직접 구현  
  ❌ `includes()` 사용 금지

 */

  // function inclusion (str, chr) {
  //   if (str === '') {
  //     return '문자를 입력해주세요.';
  //   }

  //   let result = '';
  //   for (let i = 0; i < str.length; i++) {
  //     if (str[i] === chr){
  //       result = str[i];
  //     }
  //   }
  //   if (result !== '') {
  //     return alert('포함됨');
  //   } else {
  //     return alert('포함되지 않음');
  //   }
  // }
  function inclusion(str, chr) {
    if (str === ''){return '문자를 입력하세요.';}

    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i) === chr) {return '포함됨';}
      return '포함되지 않음';  
    }
    
  }
  
  const inputStr = prompt('문자를 입력하세요.', '');
  const inputChr = prompt('찾고싶은 단어를 입력하세요.', '');
  console.log(inclusion(inputStr, inputChr));

