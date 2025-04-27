/**
 * 
### 4️⃣ **중첩 객체 값 찾기 (재귀 연습)**

    다음 구조에서 "target" 값을 재귀로 찾아 반환하세요.

    `const obj = { a: { b: { c: { d: 'target' }}}}`

 */
    const obj = { a: { b: { c: { d: 'target' }}}}
    console.log(objValueFind(obj, 'd'));

    function objValueFind (obj, key) {
        for (let k in obj) {
            if (k === key) {return obj[k];}
       

            const val = obj[k];
            if (typeof val === 'object' && !Array.isArray(val) && val !== null) {
                const found = objValueFind(val, key);

                if (found !== undefined) return found;
            }
        }
    }