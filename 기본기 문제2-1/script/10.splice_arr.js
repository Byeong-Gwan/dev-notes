/**
 * 
 **🔥 10. `splice()`를 활용하여 배열에서 특정 값 삭제하기**

 * 배열 `[10, 20, 30, 40, 50]`에서 `30`을 삭제하는 코드를 작성하세요.  
    💡 **출력:** `[10, 20, 40, 50]`

 */

    let arr = [10, 20, 30, 40, 50];
    arr.splice(2, 1);

    document.write(arr);