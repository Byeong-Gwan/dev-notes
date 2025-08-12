/**
 * 
### 🔹 4. **정렬 기반 중간값 판단**

    ```
    // ❓ 숫자 배열이 주어질 때, 중앙값(중간 인덱스의 값)을 구하라. 짝수일 땐 두 수의 평균. 
    // 입력: [1, 2, 3] → 2 
    // 입력: [1, 2, 3, 4] → 2.5
    ```

 */

    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3, 4];
    console.log(sortMedianDetermination(arr1));
    console.log(sortMedianDetermination(arr2));

    function sortMedianDetermination (arr) {
        const arrLength = [...arr].sort((a, b) => a - b).length;
        const middleIndex = Math.floor(arrLength / 2);

        if (arrLength % 2 === 0) {
            return (arr[middleIndex] + arr[middleIndex - 1]) / 2.0;
        } else {
            return arr[middleIndex];
        }
        
    }