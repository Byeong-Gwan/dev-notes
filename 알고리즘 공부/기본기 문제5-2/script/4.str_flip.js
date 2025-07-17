/**
 * 
### **4️⃣ 문자열 뒤집기**

    `// 입력: "hello" → 출력: "olleh"`

    `function reverseStr(str) { }`
 */

    const str = "hello";
    console.log(reverseStr(str));

    function reverseStr(str) {
        return str.split('').reverse().join('');
    }