/**
 * 
### ✅ 2️⃣ 배열 내 음수 개수 세기

    > 숫자로만 구성된 배열이 주어졌을 때,  
    > **음수 값의 개수**를 반환하세요.

    - 입력: `[3, -1, -9, 0, 4, -2]`
        
    - 출력: `3`
        
    `function countNegative(arr) {   // 구현 } console.log(countNegative([3, -1, -9, 0, 4, -2]));`

 */

    // function countNegative(arr) {
    //     let count = 0;

    //     arr.find((e) => {
    //         if (e < 0) {
    //             count++;
    //         }
    //     });
    //     return count;
    // } 

    function countNegative (arr) {
        return arr.filter(e => e < 0).length;
    }

    console.log(countNegative([3, -1, -9, 0, 4, -2]));