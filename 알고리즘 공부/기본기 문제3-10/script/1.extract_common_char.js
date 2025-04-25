/**
 * ### 1️⃣ **공통 문자 추출 (기초)**

    두 문자열에 모두 포함된 문자를 **순서 유지**하여 반환하세요.

    ```
    // 입력: 'banana', 'bandana' 
    // 출력: 'bana'
    ```

 */

    console.log(commChar('banana', 'bandana'));

    // 논리 흐름은 좋으나 비효율적인 방법임 
    // function commChar (str1, str2) {
    //     let result = [];

    //     for (let i = 0; i < str1.length; i++) {
    //         for (let j = 0; j < str2.length; j++) {
    //             if (str1[i] === str2[j]) {
    //                 result.push(str2[i]);
    //             }
    //         }
    //     }
        
    //     result = result.filter((e, idx) => result.indexOf(e) === idx);

    //     return result.join('');
    // }

    function commChar (str1, str2) {
        let result = '';
        let used = {}; // 중복 방지

        for (let i = 0; i < str1.length; i++) {
            const ch = str1[i];
            if (str2.indexOf(ch) !== -1 && !used[ch]) {
                result += ch;
                used[ch] = true;
                console.log(used);
            }
        }

        return result;
    }