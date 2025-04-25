/**
 * ### ✅ 🧩 **1️⃣ 공통 문자 찾기 (기초)**

    두 개의 문자열이 주어졌을 때,  
    두 문자열에 **모두 포함된 문자**만 골라 새로운 문자열로 만드세요.

    - 🔹 입력: `"apple", "plea"`
        
    - 🔹 출력: `"ple"`
        

    📌 조건:

    - 중복 문자 제거 ❌
        
    - `for`, `charAt`, `includes` 사용 가능
 */

    console.log(commStr('apple', 'plea'));

    // 조건 위반 : 중복 제거 X 부분 위반함 
    // function commStr (str1, str2) {
    //     let str3 = [];

    //     for (let i = 0; i < str1.length; i++) {
    //         for (let j = 0; j < str2.length; j++) {
    //             if (str1[i] === str2[j]) {
    //                 str3.push(str1[i]);
    //                 console.log('??', str1[i],str2[j]);
    //             }
    //         }
    //     }
    //     const result = str3.filter((e, idx) => {return str3.indexOf(e) === idx});

    //     return result.join('');
    // }

    function commStr (str1, str2) {
        let str = [];
        let str2Arr = str2.split(''); // str2를 배열로 전환해서 문자열 제거 가능
        
        for (let i = 0; i < str1.length; i++) {
            const ch = str1[i];
            const idx = str2Arr.indexOf(ch); // str2에 현재 문자가 있는지 확인
            if (idx !== -1) {
                str.push(ch); // 공톤 문자면 추가
                str2Arr.splice(idx, 1); // 이미 있으면 중복 방지
            }
        }
        return str.join('');
    }