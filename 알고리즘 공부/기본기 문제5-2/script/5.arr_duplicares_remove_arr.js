/**
 * 
### **5️⃣ 배열에서 중복 제거 (Set 금지)**

    `// 입력: [1, 2, 2, 3, 1] → 출력: [1, 2, 3]`

    `function uniqueArr(arr) { }`
 */

    const arr = [1, 2, 2, 3, 1];
    console.log(uniqueArr(arr));

    function uniqueArr(arr) {
        return arr.filter((a, b) => arr.indexOf(a) === b);
    }