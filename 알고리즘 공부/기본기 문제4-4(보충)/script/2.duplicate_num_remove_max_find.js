/**
 * 
### 2️⃣ **중복 숫자 제거 후 최대값 찾기**

    > 🔹 _개념_: 중복 제거 + 최대값  
    > 🔹 _난이도_: ★★☆☆☆

    **문제**  
    숫자 배열에서 **중복을 제거한 후**, **최댓값**을 반환하세요.  
    `Math.max`는 사용 가능, `Set()`은 금지.

    js

    복사편집

    `// 입력: [2, 4, 4, 1, 5, 2] // 출력: 5`

 */

    console.log(duplicateNumMaxFind([2, 4, 4, 1, 5, 2]));

    function duplicateNumMaxFind (arr) {
        // 중복 제거
        const duplicateRemove = arr.filter((e, idx) => {
            return arr.indexOf(e) === idx;
        });

        // 가장 큰 숫자
        let max = Math.max(...duplicateRemove);

        return max;
    }