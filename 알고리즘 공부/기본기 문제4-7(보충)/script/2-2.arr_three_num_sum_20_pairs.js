/**
 * 2-2.

    - **문제:**  
        주어진 배열에서 **합이 `20`이 되는 세 숫자의 쌍**을 찾아 반환하세요.  
        (중복된 쌍은 제거)
        
        
    ```javascript
    const arr = [10, 5, 7, 8, 3, 2, 12]; 
    console.log(findTriplets(arr, 20)); // [[10, 7, 3], [8, 7, 5]]  

    function findTriplets(arr, target) {     // 여기에 투 포인터 로직 작성 

    }

 */

    const arr = [10, 5, 7, 8, 3, 2, 12]; 
    console.log(findTriplets(arr, 20)); // [[10, 7, 3], [8, 7, 5]]  

    function findTriplets(arr, target) {     // 여기에 투 포인터 로직 작성 
        let result = [];
        const seen = new Set();
        arr.sort((a, b) => a - b);

        for (let i = 0; i < arr.length; i++) {
            let left = i + 1;
            let right = arr.length - 1;

            while (left < right) {
                const sum = arr[i] + arr[left] + arr[right];

                if (sum === target) {
                    const triplet = [arr[i], arr[left], arr[right]];
                    const key = triplet.slice().sort((a, b) => a - b).join(',');
                    if (!seen.has(key)) {
                        result.push(triplet);
                        seen.add(key);
                    }
                    left++;
                    right--;
                } else if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return result;
    }
