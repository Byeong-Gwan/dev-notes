/**
 * 
### 10. **연속된 숫자 개수 세기**

    숫자 배열에서 연속된 같은 숫자의 개수를 세어 배열로 반환하라. 
    입력: [1,1,2,2,2,3,3,1] 
    출력: [[1,2], [2,3], [3,2], [1,1]]  // [값, 개수]

 */

    const arr = [1,1,2,2,2,3,3,1];
    console.log(arrCountingConsecutiveNum(arr));

    function arrCountingConsecutiveNum(arr = []) {
        return arr.reduce((acc, v) => {
                const last = acc[acc.length - 1];
                // 같은 값이면 개수만 +1
                if (last?.[0] === v) {
                    last[1] += 1;
                } else {
                    acc.push([v, 1]);// 새 그룹 시작
                }               
                return acc;
            }, []
        );
    }