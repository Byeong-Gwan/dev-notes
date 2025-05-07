/**
 * 
### 4️⃣ **문자열 슬라이싱으로 패턴 확인**

    > 🔹 _개념_: substring + 반복  
    > 🔹 _난이도_: ★★★☆☆

    **문제**  
    문자열에서 **"abc"라는 패턴이 등장한 위치의 인덱스**를 배열로 반환하세요.

    `// 입력: 'aabcabcxabc' // 출력: [1, 4, 8]`

 */

    console.log(chkPatternStr('aabcabcxabc', 'abc'));

    function chkPatternStr (str, patterns) {
        let result = [];
        
        for (let i = 0; i <= str.length - patterns.length; i++) {
            if (str.substring(i, i + patterns.length) === patterns) {
                result.push(i);
            }
        }

        return result;
    }