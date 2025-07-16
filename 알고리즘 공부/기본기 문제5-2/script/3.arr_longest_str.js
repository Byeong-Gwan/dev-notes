/**
 * 
### **3️⃣ 배열에서 가장 긴 문자열 반환**

    `// 입력: ["hi", "hello", "js"] → 출력: "hello"`

    `function longestString(arr) { }`
 */

    const arr = ["hi", "hello", "js"];
    console.log(longestString(arr));

    function longestString(arr) {
        // 배열을 순회하면서 문자열의 각각의 길이를 배열로 저장
        let eachLength = arr.map(a => a.length);
        // 가장 큰 숫자
        let maxNum = Math.max(...eachLength);
        // 찾은 가장 큰 숫자의 index 값 
        let str = eachLength.indexOf(maxNum)

        return arr[str];
    }

    // function longestString(arr) {
    //     return arr.reduce((longest, current) =>
    //       current.length > longest.length ? current : longest
    //     , "");
    //   }
      