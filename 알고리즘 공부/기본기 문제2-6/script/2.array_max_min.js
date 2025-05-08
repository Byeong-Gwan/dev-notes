/**
 * 
### 2. **배열 최대/최소값 찾기**

    > 숫자 배열에서 최댓값, 최솟값 찾기

    - 입력: `[5, 10, 3, 22, 1]`
    - 출력: `최댓값: 22, 최솟값: 1`

    ### 조건

    - `for` 사용 (Math.max 금지)
    - 숫자 외 요소는 무시 처리
 */

    const inputArr = [5, 10, 3, 22, 1];
    let max = inputArr[0];
    let min = inputArr[0];

    for (let i = 0; i < inputArr.length; i++) {
        if (isNaN(inputArr[i]) || typeof inputArr[i] !== 'number'){continue;}
        if (max < inputArr[i]) {max = inputArr[i]}
        if (min > inputArr[i]) {min = inputArr[i]}
    }

    if (max === null || min === null) {
        console.log('숫자가 아닙니다.');
    } else {
        console.log('max: ', max);
        console.log('min: ', min);
    }

