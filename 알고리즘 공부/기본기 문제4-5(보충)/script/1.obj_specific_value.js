/**
 * 
### **1️⃣ 중첩 객체에서 특정 값 찾기 (재귀 연습)**

> 🔹 _개념_: 재귀 탐색 + 객체 순회  
> 🔹 _난이도_: ★★★★☆

**문제**  
주어진 객체에서 `"target"`이라는 값을 찾아, 해당 키를 반환하세요.  
(깊이 제한이 없고, 중첩 객체가 계속 이어질 수 있음)

    `const data = { a: { b: { c: { d: { e: 'target' }}}}};`

    - 출력: `"e"`
        
 */
    const data = { a: { b: { c: { d: { e: 'target' }}}}};
    console.log(objSpecific(data));

    function objSpecific (data) {

        for (const key in data) {
            // 바로 'target' 나오면 해당 key 값을 반환한다.
            if (data[key] === 'target') {
                return key;
            }

            // null이 아니고 타입이 object이면 재기함수에 인자값을 넘겨준다.
            // 반복해서 찾았을때 해당 값이 있으면 found 변수에 저장하고 반환
            if (typeof data[key] === 'object' && data[key] !== null) {
                const found = objSpecific(data[key]);
                if (found) return found;
            }
        }
        // 아무 값도 없을때 null값을 반환 한다.
        return null;
    }