/**
 * 
### ✅ 🧩 **5️⃣ 중첩 객체 값 찾기 (심화)**
    
    다음과 같은 객체가 주어졌을 때,  
    `"b"` 키의 값을 반환하는 함수를 작성하세요.

    `const data = {   a: {     b: {       c: "hello"     }   } };`

    - 🔹 출력: `"hello"`
        

    📌 조건:

    - 객체 탐색
        
    - `return obj.a.b.c` 형태 가능하나
        
    - `재귀` 방식으로 풀어보면 더 좋음 (선택 과제)
 */

    const data = {   a: {     b: {       c: "hello"     }   } };
    console.log(objValue(data, "c"));

    /**
     * 
     * @param {*} obj 
     * @returns 
     * 단순하게 보면 이렇게 처리할 수 있지만,
     * 문제는 구조를 모르는 실무인 경우 발생함
     * 구조를 정확히 모르는 상태에서 중첩 된 객체를 찾을때는 
     * 해당 로직을 활용할 수 없다.
     * 그저 풀기에 바쁜 방법 
     */
    // function objValue (obj) {
    //     return obj.a.b.c;
    // }
    
    // 재귀함수를 사용해서 찾기
    function objValue (obj, key) {
        for (let k in obj) {
            if (k === key) return obj[k];
            
            const val = obj[k];
            if(typeof val === 'object' && !Array.isArray(val) && val !== null) {
                const found = objValue(val, key);
                if (found !== undefined) return found;
            }
        }
    }

      