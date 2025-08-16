/**
 * 
### 2. **조건부 평균 구하기**

    ```
    // 점수 배열에서 60점 이상인 점수의 평균을 구하라. 
    // 입력: [55, 72, 91, 38, 60] 
    // 출력: 74.33 (소수점 둘째 자리까지)

 */

    const arr = [55, 72, 91, 38, 60];
    console.log(findingConditional(arr));

    function findingConditional (arr) {
        let sum = 0;
        let count = 0;
        
        arr.forEach(score => {
            if (score >= 60) {
                sum += score;
                count++;
            }  
        });

        return  (sum / count).toFixed(2);

    }