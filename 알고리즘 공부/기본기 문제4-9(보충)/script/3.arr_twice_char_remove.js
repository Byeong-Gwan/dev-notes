/**
 * 
#### 3️⃣ **문자열에서 중복된 문자가 2번 이상 등장하면 그 문자 제거**

    `// 예: "aabccd" → "bd" function removeRepeatedTwice(str) { }`

 */
    const str = 'aabccd';
    console.log(removeRepeatedTwice(str));

    function removeRepeatedTwice(str) {
        const obj = {};
        const result = [];

        for (const key of str) {
            obj[key] = (obj[key] || 0) + 1;
        }
        console.log(obj);

        Object.keys(obj).forEach(char => {
            if (obj[char] === 1) {
                result.push(char);
            }
        })
        return result.join('');
     }

     // 이렇게 하면 한번만 나온 문자를 출력 할 수 있다.
    //  function removeRepeatedTwice(str) {
    //     return str
    //       .split('')
    //       .filter((char, idx, arr) => arr.indexOf(char) === arr.lastIndexOf(char))
    //       .join('');
    //   }