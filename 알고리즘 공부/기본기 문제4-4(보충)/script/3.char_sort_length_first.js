/**
 * 
### 3️⃣ **문자 길이 기준 정렬 후 첫 문자 추출**

    > 🔹 _개념_: 정렬 기준 처리  
    > 🔹 _난이도_: ★★★☆☆

    **문제**  
    문자열 배열을 길이 기준으로 정렬하고, **각 단어의 첫 글자만** 연결하여 반환하세요.

    `// 입력: ['apple', 'fig', 'banana'] // 출력: 'fab'`

 */

    console.log(charSortLengthFirst(['apple', 'fig', 'banana']));

    function charSortLengthFirst (arr) {
        let result = '';

        arr.sort((a, b) => {
            return a.length - b.length;
        });

        for (let i = 0; i < arr.length; i++) {
            result += arr[i][0];
        }

        return result;
    }


    // if (firstStr > arr[i].length) {
    //     result += arr[i][0];
    //     continue;
    // } 
    // result += arr[i][0];
