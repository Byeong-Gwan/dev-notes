/**
 * 
### ✅ 6. 두 배열의 합

#### 원래 문제: 두 배열의 합이 특정 수가 되는 쌍 찾기

    > **🔁 연습 문제:**  
    > 두 배열에서 **합이 `11`이 되는 쌍**을 `[[a, b], ...]` 형식으로 반환하세요.

    ```javascript
    const arr1 = [2, 3, 5, 7];   
    const arr2 = [4, 6, 8, 9];   

    console.log(findPairSum(arr1, arr2, 11)); // [[2,9], [3,8], [5,6]]
 */

    const arr1 = [2, 3, 5, 7];   
    const arr2 = [4, 6, 8, 9];   

    console.log(findPairSum(arr1, arr2, 11)); // [[2,9], [3,8], [5,6]]

    function findPairSum (arr1, arr2, target) {
        const arr = [];

        for (let i = 0; i < arr1.length; i++) {
            for (let j = 0; j < arr2.length; j++) {
                const sum = arr1[i] + arr2[j];

                if (sum === target) {
                    arr.push([arr1[i], arr2[j]]);
                }
            }
        }
        return arr;
    }
    
    // set 활용해서 하기
    // function findPairSum (arr1, arr2, target) {
    //     const result = [];
    //     const set = new Set(arr2); // arr2 값을 미리 저장해두기

    //     for (let i = 0; i < arr1.length; i++) {
    //         const complement = target - arr1[i]; // arr1[i] + complement === target
    //         if (set.has(complement)) {
    //             result.push([arr1[i], complement]);
    //             set.delete(complement); // 중복쌍 방지
    //         }
    //     }

    //     return result;

    // }