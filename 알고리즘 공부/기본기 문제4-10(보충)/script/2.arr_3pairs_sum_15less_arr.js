/**
 * 
### 2️⃣ **배열에서 연속된 3개씩 묶어서 “합이 15 미만”인 쌍만 반환**

    > 예: `[4, 5, 3, 8, 2, 1]` → `[ [4,5,3], [5,3,8], [3,8,2], [8,2,1] ]` (단, 합이 15 미만만 결과에 포함)

    `function findSmallTriplets(arr) { }`
 */

    const arr = [4, 5, 3, 8, 2, 1];
    console.log(findSmallTriplets(arr, 15))

    function findSmallTriplets(arr, target) {
        let result = [];
        for (let i = 0; i < arr.length - 2; i++) {
            let sum = arr[i] + arr[i + 1] + arr[i + 2];
            if (sum < target) {
                result.push([arr[i], arr[i + 1], arr[i + 2]]);
            }
        }
        return result;
     }