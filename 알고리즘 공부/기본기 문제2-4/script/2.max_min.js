/**
 * 
### **2. 배열 최대/최소값 구하기 (Math.max 사용 금지)**

    > 숫자 배열에서 **최댓값과 최솟값**을 구하는 함수를 작성2하세요.

    - 입력: `[7, 3, 9, 2, 5]`
    - 출력: `최댓값: 9`, `최솟값: 2`

    ### 조건

    - 반복문, 조건문으로 직접 구현 (Math.max/min 사용 X)

 */

    const arr = [7, 3, 9, 2, 5];
    let max = arr[0];
    let min = arr[0];

    for (let i = 0; i < arr.length; i++) {
        if (max < arr[i]) {max = arr[i];}
        if (min > arr[i]) {min = arr[i];}
    }
    document.writeln('min= ', min, '<br>max= ', max);