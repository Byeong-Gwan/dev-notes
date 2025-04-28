/**
 * 
### 4️⃣ 객체 값 합 구하기 (객체 탐색)
- [ ] 
**문제**  
다음과 같이 주어진 객체에서 모든 숫자 값을 더하세요.

    `const obj = {   a: 1,   b: { c: 2, d: { e: 3 } },   f: 4 };`

    - 출력: `10`
        

    📌 조건:

    - `for...in`, `typeof`, `재귀함수` 사용할 것
        
    - 객체 안에 객체가 몇 겹이든 다 더해야 함
        
 */

    const obj = {   a: 1,   b: { c: 2, d: { e: 3 } },   f: 4 };
    
    console.log(objValFindSum(obj));

    function objValFindSum (obj) {
        let sum = 0;
        for (const key in obj) {
            if(typeof obj[key] === 'number') {
                sum += obj[key];
            } else if (typeof obj[key] === 'object'){
               sum += objValFindSum(obj[key]);
            }
        }
        return sum;
    }