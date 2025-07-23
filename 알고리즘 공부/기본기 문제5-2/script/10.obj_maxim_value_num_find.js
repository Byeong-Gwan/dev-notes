/**
 * 
### **🔟 객체 value 중 최댓값 찾기 (조금 생각)**

    `// 입력: {a: 3, b: 9, c: 2} → 출력: 9`

    `function maxValue(obj) { }`
 */

    const obj = {a: 3, b: 9, c: 2};
    console.log(maxValue(obj));

    function maxValue(obj) {
       return Math.max(...Object.values(obj));
    }