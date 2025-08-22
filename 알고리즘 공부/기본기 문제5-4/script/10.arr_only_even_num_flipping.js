/**
 * 
### 🔹 10. **짝수만 뒤집기 (응용 로직)**

    ```
    // ❓ 숫자 배열에서 짝수만 뒤집되, 홀수는 원래 자리에 그대로 둬라. 
    // 입력: [1, 2, 3, 4, 5, 6] // 출력: [1, 6, 3, 4, 5, 2] 
    // (짝수만 보면 [2,4,6] → 뒤집으면 [6,4,2] → 이걸 원래 짝수 위치에 끼워넣기)
    ```

    - ✔ 조건 분기 + 위치 보존 + 역순 활용
 */

    const arr = [1, 2, 3, 4, 5, 6];
    console.log(flippingOnlyEvenNum(arr));

    function flippingOnlyEvenNum (arr) {
        const evenFlipping = arr
            .filter(n => n % 2 === 0)
            .reverse(); // 뒤집기

        let evenIndex = 0;

        return [...arr].map(n => {
            if (n % 2 === 0) {
                return evenFlipping[evenIndex++];
            }
            return n;
        });
    }

    // const flippingOnlyEvenNum = arr => {
    //     const evens = arr.filter(n => n % 2 === 0).reverse();
    //     let i = 0;
    //     return arr.map(n => n % 2 === 0 ? evens[i++] : n);
    // };