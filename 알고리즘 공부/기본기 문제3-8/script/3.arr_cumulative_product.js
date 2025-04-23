/**
 * 
### ✅ 🧩 **3️⃣ 배열 누적 곱**

    **문제**  
    숫자 배열이 주어졌을 때, 배열 요소의 누적 곱을 구해서 반환하세요.

    - 🔹 입력: `[1, 2, 3, 4]`
        
    - 🔹 출력: `24` (1×2×3×4)
        

    📌 조건: `reduce()` 금지, `for`문으로 구현
 */

    console.log(arrCumulative([1, 2, 3, 4]));

    function arrCumulative (arr) {
        let result = 1;

        for (let i = 0; i < arr.length; i++) {
            result *= arr[i];
        }

        return result;
    }