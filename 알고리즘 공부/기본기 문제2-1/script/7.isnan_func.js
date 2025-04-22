/**
 * 
 **🔥 7. `isNaN()`을 사용하여 숫자만 입력받기**

 * 사용자가 입력한 값이 **숫자가 아니면 다시 입력하도록 반복**하세요.  
    
    💡 **입력:** `"hello"` → `"숫자를 입력하세요!"`  
    💡 **입력:** `"10"` → **출력:** `"입력한 숫자: 10"`
 */

    let inputNum = prompt('숫자를 입력하세요.', '');
    inputNum = Number(inputNum);

    if (isNaN(inputNum)) {
        alert('숫자만 작성해주세요.');
    } else {
        document.write(inputNum);
    }
    

    