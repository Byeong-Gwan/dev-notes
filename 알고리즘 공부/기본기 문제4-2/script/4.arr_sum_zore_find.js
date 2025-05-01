/**
 * ### 🧩 4️⃣ 연속 수열 합이 0 되는 경우 찾기 (심화)

**문제**  
정수 배열에서 **연속된 수들의 합이 0이 되는 경우**가 있는지 확인하세요.

    - 입력: `[3, 4, -7, 1, 2, -6]`
        
    - 출력: `true`  
        (`3 + 4 + -7 = 0`)
        

    📌 조건:

    - `for` 2중 반복문 허용
        
    - 하나라도 발견하면 `true` 리턴
        
 */

    console.log(arrSumZore([3, 4, -7, 1, 2, -6]));

    function arrSumZore (arr) {

        for (let i = 0; i < arr.length; i++) {
            let sum = 0;
            for (let j = i; j < arr.length; j++) {
                sum += arr[j];
                if (sum === 0) {
                    return true;
                    
                }
            }
        }
        return false;
    }