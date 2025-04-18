/**
 * ### 🧩 **2️⃣ 배열의 중복값만 추출하기**

    > 배열 안에서 중복되는 값만 새로운 배열로 반환하세요.

    - 🔹 입력: `[1, 2, 2, 3, 4, 4, 5]`
        
    - 🔹 출력: `[2, 4]`
        

    📌 객체를 사용해서 등장 횟수를 추적해도 되고  
    `for`, `indexOf`, `lastIndexOf` 등도 활용 가능

 */

    console.log(complexArr([1, 2, 2, 3, 4, 4, 5]));

    /**
     * 중복값은 잘 잡아내지만, 
     * 중복된 숫자가 여러 번 나오는 경우도 전부 포함되기 때문에, 
     * 최종 결과가 원하는 형태 [2, 4]처럼 고유한 중복값만 있는 배열이 되지 않는 경우도 존재
    */
    // function complexArr (arr) {
    //     const result = arr.filter((a, b) => arr.indexOf(a) !== b);
    //     return result;
    // }

    function complexArr (arr) {
        const count = {};
        const result = [];

        for (let i = 0; i < arr.length; i++) {
            const value = arr[i];
            count[value] = (count[value] || 0) + 1;
        }

        for (const key in count) {
            if (count[key] > 1) {
                result.push(Number(key));
            }
        }

        return result;
    }