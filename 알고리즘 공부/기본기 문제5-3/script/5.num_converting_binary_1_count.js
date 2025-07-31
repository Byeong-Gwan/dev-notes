/**
 * 
#### 5️⃣ **이진수로 변환 후 1의 개수 세기**

    `// 입력: 13  (1101) // 출력: 3`

 */

    const num = 13;
    console.log(convertingBinary(num));

    // 방법 1.
    function convertingBinary (num) {
        const binary = num.toString(2);
        let count = 0;

        for (let i = 0; i < binary.length; i++) {
            if (binary[i] === '1') {
                count++;
            }
        }

        return count;
    }

    // 방법 2.
    // function convertingBinary(num) {
    //     return num.toString(2).split('').filter(char => char === '1').length;
    // }

    // 방법 3.
    // function convertingBinary(num) {
    //     const matched = num.toString(2).match(/1/g);
    //     return matched ? matched.length : 0;
    // }