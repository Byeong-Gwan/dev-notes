/**
 * 
### **🔟 중복된 숫자와 개수 찾기 (최적화)**

> 🔹 _개념_: 카운팅 객체 + 정렬  
> 🔹 _난이도_: ★★★★☆

**문제**  
주어진 배열에서 **중복된 숫자와 그 개수**를 `{ 숫자: 개수 }` 형식의 객체로 반환하세요.

    `const arr = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];`

    - 출력: `{ 2: 2, 3: 3, 4: 4 }`
 */

    const arr = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];
    console.log(arrDuplicateFindNumCounts(arr));

    function arrDuplicateFindNumCounts (arr) {
        let obj = {};

        // 중복 카운팅
        for (let i = 0; i < arr.length; i++) {
            const key = arr[i];
            obj[key] = (obj[key] || 0) + 1;
        }

        let result = {};
        for (const key in obj) {
            if (obj[key] > 1) {
                result[key] = obj[key];
            }
        }
        return result;
    }