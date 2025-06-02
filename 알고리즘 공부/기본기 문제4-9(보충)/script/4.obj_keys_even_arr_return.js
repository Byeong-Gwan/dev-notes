/**
 * 
#### 4️⃣ **객체에서 value 값이 짝수인 키만 알파벳 역순으로 배열 반환**

    `// 예: {a:2, b:5, c:4} → ['c', 'a'] function evenValueKeys(obj) { }`

 */

    const obj = {a:2, b:5, c:4};
    console.log(evenValueKeys(obj));

    function evenValueKeys(obj) {
        let result = [];

        Object.keys(obj).forEach(char => {
            if (obj[char] % 2 === 0) {
                result.push(char);
            }
            console.log(char);
        });
        // return result.sort((a, b) => a > b ? -1 : 1);
        return result.sort().reverse();
     }

    //  function evenValueKeys(obj) {
    //     return Object.keys(obj)
    //       .filter(key => obj[key] % 2 === 0)
    //       .sort()
    //       .reverse();
    //   }