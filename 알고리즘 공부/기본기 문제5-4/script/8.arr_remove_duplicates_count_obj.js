/**
 * 
### 🔹 8. **중복 제거 + 등장 횟수 세기**

    ```
    // ❓ 문자열 배열에서 각 단어가 몇 번 나왔는지 객체로 반환하라. 
    // 입력: ["apple", "banana", "apple", "orange", "banana", "apple"] 
    // 출력: { apple: 3, banana: 2, orange: 1 }
    ```

    - ✔ 객체 누적 + 반복문 조합 로직
        
 */

    const arr = ["apple", "banana", "apple", "orange", "banana", "apple"];
    console.log(countOccurrences(arr));

    function countOccurrences (arr) {
        let obj = {};

        for (const key of arr) {
            console.log(key)
            obj[key] = (obj[key] || 0) + 1;
        }
        return obj;
    }

    // reduce 함수 사용
    // function countOccurrences(arr) {
    //     return arr.reduce((acc, cur) => {
    //       acc[cur] = (acc[cur] || 0) + 1;
    //       return acc;
    //     }, {});
    //   }