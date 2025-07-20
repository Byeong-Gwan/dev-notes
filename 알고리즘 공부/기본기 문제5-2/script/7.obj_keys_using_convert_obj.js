/**
 * 
### **7️⃣ 객체에서 key를 대문자로 변환**

    `// 입력: {a: 1, b: 2} → 출력: {A: 1, B: 2}`

    `function upperCaseKeys(obj) { }`
 */
    const obj = {a: 1, b: 2};
    console.log(upperCaseKeys(obj));

    function upperCaseKeys(obj) {
        return Object.keys(obj).reduce((a, key) => {
            a[key.toUpperCase()] = obj[key];
            return a;
        }, {});
    }