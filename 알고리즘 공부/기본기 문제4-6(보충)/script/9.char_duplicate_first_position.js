/**
 * 
### **5-1. 중복된 문자와 첫 번째 위치 찾기**

> 🔹 _개념_: 중복 체크 + 인덱스 추출  
> 🔹 _난이도_: ★★★☆☆

    **문제:**  
    문자열에서 **중복된 문자와 그 첫 번째 위치**를 `{ 문자: 인덱스 }` 형식으로 반환하세요.

    ```javascript
    const str = "abcabca"; 
    console.log(findFirstDuplicates(str)); // { "a": 0, "b": 1, "c": 2 }  

    function findFirstDuplicates(str) {   // 여기에 로직 작성 
    ...
    }
    ```
 */

    const str = "abcabca"; 
    console.log(findFirstDuplicates(str)); // { "a": 0, "b": 1, "c": 2 }  

    // 내가 할 수 있는 방법으로 로직 구성 결과 잘나오지만 비효율적인 방법
        // function findFirstDuplicates(str) {   // 여기에 로직 작성 
        //     let obj = {};
        //     let arr = [];

        //     for (let i = 0; i < str.length; i++) {
        //         arr.push(str[i]);
        //     }
            
        //     let result = arr.filter((element, idx) => {return arr.indexOf(element) === idx});

        //     for (let i = 0; i < result.length; i++) {
        //         obj[result[i]] =  i;
        //     }

        //     return obj;

        // }

        function findFirstDuplicates(str) {   // 여기에 로직 작성 
            let obj = {};
            let seen = {};

            for (let i = 0; i < str.length; i++) {
                const char = str[i];

                // 처음 등장하는 문자만 기록
                if (seen[char] === undefined) {
                    seen[char] = i;
                } else {
                    // 중복된 문장 중 처음 등장한 위치를 기록
                    if(!obj[char]) {
                        obj[char] = seen[char];
                    }
                }
            }

            return obj;
        }