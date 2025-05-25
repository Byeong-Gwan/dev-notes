/**
 * 
### ✅ 3. 세 수의 합

#### 원래 문제: 세 수의 합이 10인 조합 찾기

    > **🔁 연습 문제:**  
    > 정수 배열에서 **세 숫자의 합이 `12`가 되는 모든 조합**을 구하세요.

    ```javascript
    const arr = [1, 2, 3, 4, 5, 6, 7];   

    console.log(findTriplets(arr, 12)); // 예: [[1, 4, 7], [2, 4, 6], [3, 4, 5]]

 */

    const arr = [1, 2, 3, 4, 5, 6, 7];   

    console.log(findTriplets(arr, 12)); // 예: [[1, 4, 7], [2, 4, 6], [3, 4, 5]]

    function findTriplets (arr, num) {
        let result = [];
        const seen = new Set();
        arr.sort((a, b) => a - b);

        for (let i = 0; i < arr.length; i++) {
            let left = i + 1;
            let right = arr.length - 1;

            while (left < right) {
                const sum = arr[i] + arr[left] + arr[right];

                if (sum === num) {
                    const tirplet = [arr[i], arr[left], arr[right]];
                    const key = tirplet.slice().sort((a, b) => a - b).join(',');
                    if (!seen.has(key)) {
                        result.push(tirplet);
                        seen.add(key);
                    }
                    left++;
                    right--;
                } else if (sum < num) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return result;
    }