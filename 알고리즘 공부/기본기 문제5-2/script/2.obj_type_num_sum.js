/**
 * 
### **2️⃣ 객체에서 숫자 타입만 더하기**

    `// 입력: {a: 3, b: "x", c: 7} → 출력: 10`

    `function sumNumbers(obj) { }`
 */

    const obj = {a: 3, b: "x", c: 7};
    console.log(sumNumbers(obj));

    function sumNumbers(obj) {
        let sum = 0;

        for (const key in obj) {
            if (typeof obj[key] === 'number') {
                sum += obj[key];
            }
        }
        return sum;
    }

    // function sumNumbers(obj) {
    //     return Object.values(obj)
    //         .filter(v => typeof v === 'number')
    //         .reduce((acc, cur) => acc + cur, 0); // reduce는 배열을 하나의 값으로 줄인다
    // }