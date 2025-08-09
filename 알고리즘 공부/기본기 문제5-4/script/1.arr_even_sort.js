/**
 * 
 ### 🔹 1. **조건 분기 + 정렬**

    ```
    // ❓ 숫자 배열에서 짝수만 오름차순 정렬하고, 홀수는 원래 자리에 유지해라. 
    // 입력: [5, 3, 2, 8, 1, 4] 
    // 출력: [5, 3, 2, 4, 1, 8]
    ```

 */

    const arr = [5, 3, 2, 8, 1, 4];
    console.log(evenSort(arr));

    function evenSort (arr) {
        // arr 배열에 짝수 값 추출해서 정렬
        const evenSorted = arr
            .filter(n => n % 2 === 0)
            .sort((a, b) => a - b);

        let evenIndex = 0; // 짝수 인덱스 값

        // map 함수로 반복문 돌려서 arr 값에 정렬된 짝수 값을 인덱싱 해준다.
        return [...arr].map(n => {
            if (n % 2 === 0) {
                return evenSorted[evenIndex++];
            }

            return n;
        });
    }