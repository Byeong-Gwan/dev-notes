/**
 * 
### 🧠 🧩 **5️⃣ 연속된 문자 압축 (난이도↑)**

    **문제**  
    연속된 문자를 압축하여 반환하는 함수를 만드세요.  
    (예: `'aaabbc' → 'a3b2c1'`)

    - 🔹 입력: `"aaabbc"`
        
    - 🔹 출력: `"a3b2c1"`
        

    📌 조건: `for`, `charAt`, `length`, `+=` 등 사용 가능  
    ❌ `replace`, `split`, `reduce` 사용 금지
 */

    console.log(consecutiveChar('aaabbc'));

    /**
     * 조건을 보게되면 중복되는 단어를 압축해서 개수하는건데 
     * 내가 짠 로직은 합축된걸로 보여지는 상태이지 압축이 된건 아니다.
     * 그래서 'a1a1a1b1b1c1'의 결과 값이 나올 수도 있음.
     * ✅ "중복된 문자를 단순 집계한 건 압축이 아니라 통계일 뿐이다."
     *  → "연속된 문자를 기준으로 처리해야 압축이다!"
     */
    // function consecutiveChar (str) {
    //     let arr = [];
    //     let obj = {};
    //     let result = '';
        
    //     for (let i = 0; i < str.length; i++) {
    //         arr.push(str[i]);
    //     }

    //     arr.forEach((e) => {obj[e] = (obj[e] || 0) + 1});

    //     for (const [key, value] of Object.entries(obj)) {
    //         let objStr = `${key}${value}`;
    //         result += objStr;
    //     }

    //     return result;
    // }
    function consecutiveChar (str) {
        let result = ''; // 담을 그릇 선언
        let count = 1; // 중복 단어 count

        for (let i = 0; i < str.length; i++) {
            // 다음 문자랑 다르면 지금까지 누적한 묹자와 개수 기록
            if (str.charAt(i) !== str.charAt(i + 1)) {
                result += str.charAt(i) + count;
                count = 1;
            } else {
                count++; // 연속되는 문자면 카운트 증가
            }
        }

        return result;
    }