/**
 * 
### 7. **조건부 객체 생성**

    ```
    // 점수 배열에서 80점 이상이면 pass, 아니면 fail을 표시하는 객체 배열을 만들어라. 
    // 입력: [85, 42, 77, 90] 
    // 출력: [{score:85, status:"pass"}, {score:42, status:"fail"}, ...]
 */

    const arr = [85, 42, 77, 90];
    console.log(arrConditionalCreation(arr));

    function arrConditionalCreation(arr) {
        return [...arr].map(score => ({
            // if (score >= 80) {
            //     return {score: score, status: 'pass'};
            // } else {
            //     return {score: score, status: 'fail'};
            // }
            score,
            status: score >= 80 ? 'pass' : 'fail'
        }));
    }