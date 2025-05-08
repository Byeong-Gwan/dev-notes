/**
 * 
### 7️⃣ **중첩 객체 안에 원하는 값 찾기**
   
    > 🔹 _개념_: 재귀 탐색  
    > 🔹 _난이도_: ★★★★★

    **문제**  
    객체 안에 몇 겹으로 중첩되었든 `"target"`이라는 값을 찾고, **그 값을 가진 key 이름**을 반환하세요.

    `// 입력: { a: 1, b: { c: { d: 'target' }}} // 출력: 'd'`
 */

    const obj = { a: 1, b: { c: { d: 'target' }}};
    console.log(objFindVal(obj));

    // function objFindVal (obj) {
    //     let str = '';
    //     let result = '';

    //     for (const key in obj) {
    //         if (obj[key] === 'target') {
    //             str = Object.keys(obj).join('');
    //         } else {
    //             str = objFindVal(obj[key]);
    //         }
    //     }
    //     return str;
    // }

    function objFindVal (obj) {
        for (const key in obj) {
            if (obj[key] === 'target') {
                return key; // ✅ target 값을 찾으면 해당 key를 반환
            }
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                const found = objFindVal(obj[key]);
                if (found) return found; // ✅ 재귀 호출의 결과가 있을 경우 반환
            }
        }
        return null; // target을 찾지 못하면 null 반환
    }