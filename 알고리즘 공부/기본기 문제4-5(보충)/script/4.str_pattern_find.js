/**
 * 
### **4️⃣ 패턴이 몇 번 등장하는지 찾기 (카운팅 연습)**

> 🔹 _개념_: 반복문 + 조건문 + 카운팅  
> 🔹 _난이도_: ★★★☆☆

**문제**  
문자열에서 `"aba"`라는 패턴이 몇 번 등장하는지 카운트하세요.  
(패턴이 겹쳐도 카운트해야 함)

    `const str = "abababa";`

    - 출력: `3`
        
 */

    const str = "abababa";
    console.log(strPatternFind(str, 'aba'));

    function strPatternFind (str, pattern) {
        let count = 0;

        for (let i = 0; i <= str.length - pattern.length; i++) {
            if (str.substring(i, i + pattern.length) === pattern) {
                count++;
            }
        }
        return count;
    }