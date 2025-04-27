/**
 * 
### 3️⃣ **문자열 압축 (난이도↑)**

    ```
    // 입력: 'aaabbbbcccca' 
    // 출력: 'a3b4c4a1'
    ```

 */

    console.log(strCompression('aaabbbbcccca'));

    // function strCompression (str) {
    //     const arr = str.split('');
    //     let chr = arr[0];
    //     let result = '';
    //     let count = 1;

    //     for (let i = 0; i < arr.length + 1; i++) {
    //         if (arr[i] === chr) {
    //             count++;
    //         } else {
    //             result += `${chr}${count}`;
    //             count = 1;
    //             chr = arr[i];
    //         }
    //     }

    //     return result;
    // }

    // 최적화 리팩토링
    function strCompression (str) {
        let result = '';
        let count = 1;

        for (let i = 0; i < str.length; i++) {
            if (str[i] === str[i + 1]) {
                count++;
            } else {
                result += str[i] + count;
                count = 1;
            }
        }

        return result;
    }