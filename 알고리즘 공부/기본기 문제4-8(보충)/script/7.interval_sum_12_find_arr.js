/**
 * 
### ✅ 7. 연속된 숫자 합

#### 원래 문제: 연속된 숫자들의 합이 타겟이 되는 구간 찾기

    > **🔁 연습 문제:**  
    > 정수 배열에서 **연속된 숫자의 합이 12가 되는 구간**을 찾아 반환하세요.

    ```javascript
    const arr = [1, 2, 3, 4, 5, 6];   

    console.log(findSubarraySums(arr, 12)); // [[3, 4, 5], [6, 6]]
 */

    const arr = [1, 2, 3, 4, 5, 6];   

    console.log(findSubarraySums(arr, 12)); // [[3, 4, 5], [6, 6]]

    function findSubarraySums (arr, target) {
        const result = [];

        for (let i = 0; i < arr.length; i++) {
            let sum = 0;

            for (let j = i; j < arr.length; j++) {
                sum += arr[j];

                if (sum === target) {
                    result.push(arr.slice(i, j + 1));
                    break;
                } else if (sum > target) {
                    break;
                }
            }
        }
        return result;
    }