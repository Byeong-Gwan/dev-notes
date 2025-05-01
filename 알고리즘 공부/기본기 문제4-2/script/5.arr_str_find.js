/**
 * ### 🧩 5️⃣ 가장 긴 공통 시작 문자열 찾기 (초심화)

**문제**  
문자열 배열이 주어졌을 때, **모든 문자열의 공통으로 시작하는 부분**을 반환하세요.

    - 입력: `["flower", "flow", "flight"]`
        
    - 출력: `"fl"`
        

    📌 조건:

    - `for`만 사용
        
    - 고난도: 하나라도 다르면 중단해야 함
 */

    console.log(arrStrFind(["flower", "flow", "flight"]));

    /**
     * 해당 로직은 조건에 맞게하기위해 했지만,
     * 내가 다 하지 못함;;
     */
    // function arrStrFind (arr) {
    //     let arr1 = [];
    //     let arr2 = [];
    //     let obj = {};

    //     for (let i = 0; i < arr.length; i++) {
    //         for (let j = 0; j < arr[i].length; j++) {
    //             arr1.push(arr[i][j]);
    //         }
    //     }

    //     arr1.forEach((e) => {
    //         obj[e] = (obj[e] || 0) + 1;
    //     });
    //     console.log('obj:: ', obj)

    // }
    function arrStrFind (arr) {
        // 배열의 값이 없으면 return
        if (arr.length === 0) return '';

        let prefix = ''; // 중복 값 담을 그릇

        for (let i = 0; i < arr[0].length; i++) {
            const char = arr[0][i]; // 단어 담음

            for (let j = 1; j < arr.length; j++) {
                if (arr[j][i] !== char) {
                    return prefix; // 하나라도 다르면 바로 return
                }
            }
            prefix += char;
        }

        return prefix;
    }

