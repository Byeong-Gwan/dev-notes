/**
 * ### 🧩 2️⃣ 숫자 배열에서 최대 2개 합 찾기

**문제**  
숫자 배열에서 **서로 다른 2개를 골라 합이 가장 큰 값**을 구하세요.

    - 입력: `[3, 5, 1, 9, 7]`
        
    - 출력: `16` (9 + 7)
        

    📌 조건:

    - `for`만 사용 (`sort` 금지)
        
 */

    console.log(arrNumSum([3, 5, 1, 9, 7]));

    function arrNumSum (arr) {
        let maxSum = -Infinity; // 합은 음수일 수도 있음.

        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) { // i랑 다른 j만
                let sum = arr[i] + arr[j];
                if (sum > maxSum) {
                    maxSum = sum;
                }
            } 
        }
        return maxSum;
    }