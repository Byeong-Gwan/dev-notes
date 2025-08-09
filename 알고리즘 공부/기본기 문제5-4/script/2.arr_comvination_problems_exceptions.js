/**
 * 
### 🔹 2. **예외 포함한 조합 문제**

    // ❓ 주어진 정수 배열에서 합이 10이 되는 쌍의 개수를 구하라. 단, 동일 인덱스는 사용하지 않는다.
    // 입력: [1, 9, 2, 8, 3, 7, 4, 6] 
    // 출력: 4

 */

    const arr = [1, 9, 2, 8, 3, 7, 4, 6];
    console.log(findSumPairs(arr, 10));

    function findSumPairs (arr, num) {
        arr.sort((a, b) => a - b);

        let left = 0;
        let right = arr.length - 1;

        let count = 0;

        while (left < right) {
            const sum = arr[left] + arr[right];

            if (sum === num) {
                count++;
                left++;
                right--;
            } else if (sum < num){
                left++;
            } else {
                right--;
            }
        }

        return count;
    }