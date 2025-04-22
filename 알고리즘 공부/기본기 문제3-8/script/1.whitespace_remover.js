/**
 * ### ✅ 🧩 **1️⃣ 공백 제거기**

    **문제**  
    문자열에서 모든 공백(space)을 제거한 새 문자열을 반환하세요.

    - 🔹 입력: `" hello world "`
        
    - 🔹 출력: `"helloworld"`
        

    📌 조건: `replaceAll`, `trim` 사용 ❌  
    힌트: `for`, `if`, `charAt` 활용

 */

    console.log(whiteSpaceRemover(" hello world "));

    /**
     * splice 사용하게 되면 배열이 변경되는 경우 문제 발생 
     * 또는 i 값이 꼬일 수 있는 문제 발생
     */
    // function whiteSpaceRemover (str) {
    //     const result = str.split(' ');

    //     for (let i = 0; i < result.length; i++) {
    //         if (result[i] === ''){
    //             result.splice(i, 1);
    //         }    
    //     }
    //     return result.join('');
    // }

    /**
     * 
     * @param {*} str 
     * @returns result
     * - 안전한 방법을 사용하기 위해 charAt 사용해서 비교 로직으로 처리
     */
    function whiteSpaceRemover (str) {
        let result = '';
        console.log('length? ', str.length);

        for (let i = 0; i < str.length; i++) {
            const char = str.charAt(i);

            if (char !== ' ') {
                result += char;
            }
        }
        return result;
    }