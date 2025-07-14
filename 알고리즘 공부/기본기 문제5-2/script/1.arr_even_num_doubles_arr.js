/**
 * 
 * ### **1️⃣ 짝수만 2배로 변환 (map 연습)**

    `// 입력: [1, 2, 3, 4, 5] → 출력: [1, 4, 3, 8, 5]`

    `function doubleEven(arr) { }`

 */

    const arr = [1, 2, 3, 4, 5];
    console.log(doubleEven(arr));

    function doubleEven(arr) {
        return arr.map((a) => a % 2 === 0 ? a * 2 : a);
    }