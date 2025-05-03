/**
 * 
### 5️⃣ 특정 패턴 찾기

    > 문자열에서 주어진 **패턴**이 **몇 번 등장하는지** 세세요.


    `// 입력: "ababababa", 패턴: "aba" // 출력: 3`

    📌 조건

    - `for`, `substring`, `조건문`만 사용
        
    - 패턴이 겹쳐도 인정 (`aba` 겹치는 것 인정)
        
 */

    console.log(specificPattern("ababababa"));

    function specificPattern (str, pattern = 'aba') {
        let count = 0;

        for (let i = 0; i < str.length - pattern.length; i++) {
            if (str.substring(i, i + pattern.length) === pattern) {
                count++;
            }
        }

        return count;
    }