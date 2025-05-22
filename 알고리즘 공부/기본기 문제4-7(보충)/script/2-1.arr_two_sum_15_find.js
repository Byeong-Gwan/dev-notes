/**
 * 2-1.

    - **문제:**  
        **두 배열을 받아서 합이 `15`가 되는 쌍**을 찾아서 `[[a, b], ...]` 형식으로 반환하세요.  
        (중복된 쌍은 제거)
        
        
    ```javascript
    const arr1 = [1, 2, 3, 7]; const arr2 = [8, 5, 6, 9];
    console.log(findPairSum(arr1, arr2, 15)); // [[7, 8], [6, 9]]  

    function findPairSum(arr1, arr2, target) {     // 여기에 투 포인터 로직 작성 

    }

 */

    const arr1 = [1, 2, 3, 7]; 
    const arr2 = [8, 5, 6, 9]; 
    console.log(findPairSum(arr1, arr2, 15)); // [[7, 8], [6, 9]]  

    function findPairSum(arr1, arr2, target) {     // 여기에 투 포인터 로직 작성 
        let firstStr = arr1[0];
        let arr = [];

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

// function findPairSum(arr1, arr2, target) {
//     let arr = [];
//     let set = {};

//     for (let i = 0; i < arr1.length; i++) {
//         for (let j = 0; j < arr2.length; j++) {
//             const sum = arr1[i] + arr2[j];

//             if (sum === target) {
//                 const key = `${arr1[i]}-${arr2[j]}`;
//                 if (!set[key]) {
//                     arr.push([arr1[i], arr2[j]]);
//                     set[key] = true;
//                 }
//             }
//         }
//     }

//     return arr;
// }