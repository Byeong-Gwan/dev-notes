/**
 * 2-3.

    - **문제:**  
        배열에서 **합이 `30`이 되는 두 숫자의 쌍**을 찾아서 **오름차순 정렬된 배열**로 반환하세요.  
        (중복된 쌍은 제거)
        
        
        
    ```javascript
    const arr = [15, 10, 5, 20, 25, 5];  
    console.log(findSumPairs(arr, 30)); // [[5, 25], [10, 20]]  

    function findSumPairs(arr, target) {     // 여기에 투 포인터 로직 작성 

    }
 */

    const arr = [15, 10, 5, 20, 25, 5];  
    console.log(findSumPairs(arr, 30)); // [[5, 25], [10, 20]]  

    function findSumPairs(arr, target) {     // 여기에 투 포인터 로직 작성 
        let result = [];
        arr.sort((a, b) => a - b);

        let left = 0;
        let right = arr.length - 1;

        while (left < right) {
            const sum = arr[left] + arr[right];

            if (sum === target) {
                result.push([arr[left], arr[right]]);
                left++;
                right--;
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        return result;
    }