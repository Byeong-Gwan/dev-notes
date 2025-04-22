/**
 * 
### ✅ 3️⃣ 중첩 배열 평탄화 (❗생각 필요)

    > 중첩 배열 `[1, [2, 3], [4, [5]]]`가 있을 때,  
    > 모든 요소를 하나의 배열로 평탄화 하세요.

    - 입력: `[1, [2, 3], [4, [5]]]`
        
    - 출력: `[1, 2, 3, 4, 5]`
        

    > ❗ `.flat()` 사용 ❌ (직접 재귀 또는 반복문 활용)

    `function flattenArray(arr) {   // 구현 } console.log(flattenArray([1, [2, 3], [4, [5]]]));`

 */

    // 간단하게 처리하기
    function flattenArray(arr) {
        const str = arr.join(',');
        
        return str.split(',').map(Number);
    }

    // 재귀함수 방법
    // function flattenArray (arr) {
    //     let result = [];

    //     for (let i = 0; i < arr.length; i++) {
    //         if (Array.isArray(arr[i])) {
    //             result = result.concat(flattenArray(arr[i])); // 재귀함수 호출
    //         } else {
    //             result.push(arr[i]);
    //         }
    //     }
    //     return result;
    // }

    console.log(flattenArray([1, [2, 3], [4, [5]]]));