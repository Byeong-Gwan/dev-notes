/**
 * 
### 6️⃣ **문자 등장 수 카운팅 + 가장 많이 나온 문자**

    > 🔹 _개념_: 카운팅 객체 구성  
    > 🔹 _난이도_: ★★★★☆

    **문제**  
    문자열에서 가장 많이 나온 **문자 1개**를 반환하세요.  
    동점일 경우 알파벳 순서 앞에 있는 문자 반환.

    `// 입력: 'aabbccddeeeee' // 출력: 'e'`

 */

    console.log(charCountAppearing('aabbccddeeeee'));

    function charCountAppearing (str) {
        const obj = {};
        let maxCount = 0;
        let result = '';

        for (const char of str) {
            obj[char] = (obj[char] || 0) + 1;
        
            if (obj[char] > maxCount) {
                maxCount = obj[char];
                result = char;
            } else if (obj[char] === maxCount) {
                result = result < char ? result :char;
            }
        }
        return result;
    }