/**
 * 
### ✅ 🧩 **4️⃣ 중복 없는 숫자 배열 만들기 (기초)**
    
    1~10 사이의 랜덤한 숫자 중,  
    **중복 없는 5개 숫자를 배열로 반환하는 함수**를 작성하세요.

    - 🔹 출력 예시: `[3, 1, 8, 5, 7]`
        

    📌 조건:

    - `while`, `Math.random()`, `includes()` 활용
        
 */

    console.log(arrDupNumCreate());


    // parseInt 보다 더 명시적으로 Math.floor() 사용하는걸 추천
    // function arrDupNumCreate () {
    //     let numList = [];

    //     while (numList.length < 5) {
    //         const num = parseInt(Math.random() * 10 + 1);

    //         if (!numList.includes(num)) {
    //             numList.push(num);
    //         }
    //     }
    //     return numList;
    // }

    function arrDupNumCreate () {
        const result = [];
        while (result.length < 5) {
            const rand = Math.floor(Math.random() * 10) + 1;
            if (!result.includes(rand)) result.push(rand);
        }
        return result;
    }