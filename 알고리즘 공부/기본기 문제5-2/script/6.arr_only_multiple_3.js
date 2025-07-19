/**
 * 
### **6️⃣ 3의 배수만 추출**

    `// 입력: [1, 3, 6, 7, 9] → 출력: [3, 6, 9]`

    `function multipleOfThree(arr) { }`
 */

    const arr = [1, 3, 6, 7, 9];
    console.log(multipleOfThree(arr));

    function multipleOfThree(arr) {
        return arr.filter((e) => {
            return e % 3 === 0
        });
    }