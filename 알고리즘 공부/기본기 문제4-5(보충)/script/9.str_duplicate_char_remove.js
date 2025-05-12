/**
 * 
### **9️⃣ 문자열 내 중복 문자 제거 (최적화)**

> 🔹 _개념_: 중복 제거 + 정렬  
> 🔹 _난이도_: ★★★☆☆

**문제**  
문자열에서 중복된 문자를 제거하고, **정렬된 결과**를 반환하세요.

    `const str = "cbbaac";`

    - 출력: `"abc"`
        
 */

    const str = "cbbaac";
    console.log(strDuplicateCharRemove(str));

    function strDuplicateCharRemove (str) {
        let result = [];

        for (let i = 0; i < str.length; i++) {
            if (result.indexOf(str[i]) === -1) {
                result.push(str[i]);
            }
        }
        
        return result.sort().join('');
    }