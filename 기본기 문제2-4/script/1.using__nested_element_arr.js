/**
 * ## 1. **중첩 반복문 활용 – 배열 중복 요소 찾기**

    > 두 배열에서 **공통으로 포함된 값만** 찾아 출력하세요.

    - 입력: `[1, 3, 5, 7]`, `[3, 4, 5, 6]`
    - 출력: `[3, 5]`

    ### 조건

    - Set 금지
    - 중첩 반복문 활용
    - **중복 없이 한 번만** 결과 출력

 */

    const arr1 = [1, 3, 5, 7];
    const arr2 = [3, 4, 5, 6];

    const arr3 = arr1.filter(element => arr2.includes(element));
    document.writeln('중복 값: ', arr3.join(', '));

    let arr4 = [];

    for (let i =0; i < arr1.length; i++) {
        for (let j =0; j < arr2.length; j++){
            if (arr1[i] === arr2[j] ) {
                let isDuplicate = false;
                arr4[j] = arr1[i];
                for (let k = 0; k < arr4.length; k++) {
                    if (arr4[k] === arr1[i]) {
                        isDuplicate = true;
                        break;
                    }
                    
                }
                if (!isDuplicate){
                    arr4.push(arr1[i]);
                }

            }
        }
    }
    document.writeln('<br>for문으로 중복 값: ', arr4);