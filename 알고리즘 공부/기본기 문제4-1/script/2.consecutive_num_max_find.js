/**
 * 
### 2️⃣ 연속된 숫자 합 중 최대 길이 찾기 (난이도↑)

**문제**  
양수 배열에서, 합이 같은 연속 구간 중 **가장 긴 길이**를 구하세요.

    - 입력: `[1, 2, 1, 1, 1, 2, 1]`
        
    - 출력: `5` → (1+1+1+2)
        

    📌 조건:

    - `for`, `조건문`, `Math.max`만 사용
        
    - 투포인터 비슷한 아이디어 필요
        
 */

    console.log(consecutiveNum([1, 2, 1, 1, 1, 2, 1]));

    function consecutiveNum (arr) {
        let maxLen = 0;
        let start = 0;
        let sum = 0;

        for (let end = 0; end < arr.length; end++) {
            sum += arr[end]; // 끝 포인터가 가리키는 값을 합에 추가

            // 필요한 경우 합 조정
            while (sum > 5) {
                sum -= arr[start];
                start++;
            }

            if (sum === 5) {
                maxLen = Math.max(maxLen, end - start + 1); // 길이 갱신
            }
        }
        return maxLen;
    }

    // "배열 양끝 합으로 특정 값을 찾는 문제" 에 적합한 로직
    // function consecutiveNum (arr) {
        // let p1 = 0;
        // let p2 = arr.length - 1;

        // while (p1 !== p2) {
        //     const result = arr[p1] + arr[p2];

        //     if (result === 5) {
        //         return [...arr[p1], arr[p2]];
        //     }

        //     if (result > 5) {
        //         p2--;
        //     } else {
        //         p1++;
        //     }
        // }
        // return false;
    // }