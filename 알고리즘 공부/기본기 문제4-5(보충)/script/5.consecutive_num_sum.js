/**
 * 
### ✅ **슬라이딩 윈도우 / 투 포인터 문제 2문제**

### **5️⃣ 연속된 숫자 구간 합 중 최댓값**

> 🔹 _개념_: 슬라이딩 윈도우 + 합산  
> 🔹 _난이도_: ★★★★☆

**문제**  
정수 배열에서 연속된 숫자 구간의 합 중에서 최댓값을 찾아 반환하세요.  
(구간의 길이는 3으로 고정)

    `const arr = [1, 2, 3, 4, 5, 6, -1];`

    - 출력: `15` (3 + 4 + 5)
        
 */

    const arr = [1, 2, 3, 4, 5, 6, -1];
    console.log(consecutiveNumSum(arr, 3));

    // 잘못된 로직 참고 
    // function consecutiveNumSum (arr, len) {
    //     let a = [];
    //     let b = [];

    //     for (let i = 0; i < arr.length; i++) {
    //         if (i < len) {
    //             a.push(arr[i]);
    //         } else {
    //             b.push(arr[i])
    //         }            
    //     }

    //     let aSum = 0;
    //     let bSum = 0;

    //     for (let i = 0; i < len; i++) {
    //         aSum += a[i];
    //         bSum += b[i];
    //     }
    //     if (aSum > bSum) {
    //         return aSum;
    //     } else {
    //         return bSum;
    //     }
    // }

    function consecutiveNumSum (arr, len) {
        if (arr.length < len) return null;

        // 첫 번째 구간의 합 계산
        let maxSum = 0;
        for (let i = 0; i < len; i++) {
            maxSum += arr[i];            
        }

        let currentSum = maxSum;

        // 슬라이딩 윈도우 시작
        for (let i = len; i < arr.length; i++) {
            // 이전 구간ㅇ의 첫 번째 값은 빼고, 새로 들어온 값을 더함
            currentSum = currentSum - arr[i - len] + arr[i];
            maxSum = Math.max(maxSum, currentSum);
        }

        return maxSum;
    }