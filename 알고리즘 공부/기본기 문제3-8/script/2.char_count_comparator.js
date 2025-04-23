/**
 * ### ✅ 🧩 **2️⃣ 문자 개수 비교기**

    **문제**  
    문자열에 `'a'`와 `'b'`가 몇 개씩 있는지 비교해 같으면 `"YES"`, 다르면 `"NO"`를 반환하세요.

    - 🔹 입력: `"aabbab"`
        
    - 🔹 출력: `"YES"`
        

    📌 조건: 대소문자 구분 없음 (`toLowerCase()` 사용 가능)

 */

    console.log(charterComparatorCount("aabbab"));

    function charterComparatorCount (str) {
        const arr = str.toLowerCase().split('');
        const obj = {};
        let result = 'NO';

        arr.forEach((e) => {
            obj[e] = (obj[e] || 0) + 1;
            
        });

        if (obj.a === obj.b) {
            result = 'YES';
        }
     return result;   
    }