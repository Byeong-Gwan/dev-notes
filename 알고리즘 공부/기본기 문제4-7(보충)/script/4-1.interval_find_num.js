/**
 * 4-1.

    - **문제:**  
    주어진 배열에서 **연속된 숫자들의 합이 `target`이 되는 구간**을 모두 찾아 반환하세요.  
    (중복된 구간은 제거, 오름차순 정렬)
    
    ```javascript
    const arr = [1, 2, 3, 4, 5, 6];  
    console.log(findSubarraySums(arr, 9)); // [[2, 3, 4], [4, 5]]  
    
    function findSubarraySums(arr, target) {     // 여기에 로직 작성 
    
    }

 */

    const arr = [1, 2, 3, 4, 5, 6];  
    console.log(findSubarraySums(arr, 9)); // [[2, 3, 4], [4, 5]]  
    
    function findSubarraySums(arr, target) {     // 여기에 로직 작성 
        const result = [];

        for (let i = 0; i < arr.length; i++) {
            let sum = 0;

            for (let j = i; j < arr.length; j++) {
                sum += arr[j];

                if (sum === target) {
                    result.push(arr.slice(i, j + 1));
                    break; // 중복 구간 방지를 위해 바로 탈출
                } else if (sum > target) {
                    break; // 더 이상 확인할 필요 없음
                }
            }
        }

        return result;
    }
