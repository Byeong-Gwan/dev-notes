/**
 * 
### **1-1. 중첩 객체에서 특정 키 찾기**

> 🔹 _개념_: 재귀 탐색 + 객체 순회  
> 🔹 _난이도_: ★★★☆☆

    **문제:**  
    주어진 객체에서 **"finalTarget"이라는 키**를 찾아, 해당 키의 값을 반환하세요.  
    (깊이 제한이 없고, 중첩 객체가 계속 이어질 수 있음)

    ```javascript
    const data = { a: { b: { c: { d: { finalTarget: '찾았다!' }}}}}; console.log(findTarget(data)); 
    // "찾았다!"  
    function findTarget(obj) {   // 여기에 재귀 함수 작성 
    ...
    }
    ```
 */

    const data = { a: { b: { c: { d: { finalTarget: '찾았다!' }}}}}; 
    console.log(findTarget(data)); // "찾았다!"  

    // const data2 = { finalTarget: '최상위에서 발견' };
    // console.log(findTarget(data2)); // "최상위에서 발견"
    // const data3 = { a: { b: { finalTarget: '첫 번째' }}, c: { d: { finalTarget: '두 번째' }}};
    // console.log(findTarget(data3)); // "첫 번째"
    // const data4 = { a: { b: { c: { d: '없음' }}}};
    // console.log(findTarget(data4)); // null
    // const data5 = { a: null, b: {}, c: { d: { finalTarget: '발견!' }}};
    // console.log(findTarget(data5)); // "발견!"

    function findTarget(obj) {   // 여기에 재귀 함수 작성 
        for (const key in obj) {
            
            if (key === 'finalTarget') return obj[key];

            if (typeof obj[key] === 'object' && obj[key] !== null) {
                const found = findTarget(obj[key]);

                if(found) return found;
            }
        }
        return null;
    }