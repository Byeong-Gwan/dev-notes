/**
 * 
### 4️⃣ 중복 제거 + 정렬된 배열 반환

    > 숫자 배열이 주어졌을 때,  
    > **중복을 제거하고 오름차순으로 정렬된 배열**을 반환하세요.

    `// 입력: [4, 1, 2, 2, 3, 4, 5] // 출력: [1, 2, 3, 4, 5]`

    📌 조건

    - `for`, `includes`, `sort`
        
    - **Set 금지**
        
 */

    console.log(removeDuplicatesSortArr([4, 1, 2, 2, 3, 4, 5]));

    function removeDuplicatesSortArr (arr) {
        let result = [];

        // 정렬
        arr.sort((a, b) => a - b);

        // 중복제거
        for (let i = 0; i < arr.length; i++) {
            if (!result.includes(arr[i])) {
                result.push(arr[i]);
            }
        }
        return result;
    }