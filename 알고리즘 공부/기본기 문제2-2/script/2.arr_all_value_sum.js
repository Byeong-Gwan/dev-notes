/**
 * 
 **🔥 2. 배열의 모든 요소 합 구하기 (`reduce` 사용 금지)**

 * 배열 `[3, 5, 7, 2, 8]`의 모든 요소를 더하는 코드를 작성하세요.  
    단, `reduce()`를 사용하지 말고 `for` 또는 `while` 반복문을 사용하세요.  
💡 
    **출력:** `합계: 25`
 */

    const arr = [3, 5, 7, 2, 8];
    let arrAllSum = 0;

    // 배열에 있는 요소 하나씩 가져와서 element에 넣음
    arr.forEach((element) => {
        // array 에 있는 요소 하나씩 가져와서 arrAllSum에 누적산함 
        // 요소가 하나도 없을때까지 반복
        arrAllSum += element;
    });

    // 배열의 합산한 값을 출력
    document.write('배열의 합산: ', arrAllSum);