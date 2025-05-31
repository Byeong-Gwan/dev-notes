/**
 * 
#### 2️⃣ **배열에서 연속된 숫자 2개씩 묶어서 합이 10 이하인 쌍만 반환**

    `// 예: [2, 3, 5, 8, 1] → [[2, 3], [3, 5], [1, 8]] function findSmallPairs(arr) { }`

 */
    const arr = [2, 3, 5, 8, 1];
    console.log(findSmallPairs(arr, 10));
    
    function findSmallPairs(arr, target) { 
        let result = [];
        
        // 인접한 항목끼리만 비교 let i = 0; i < arr.length - 1 해당 조건이 명확
        for (let i = 0; i < arr.length - 1; i++) {
            const sum = arr[i] + arr[i + 1];
            if (sum <= target) {
                result.push([arr[i], arr[i + 1]]);
            }
        }
        return result;
    }