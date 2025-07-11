/**
 * 
### 🔟 객체에서 value 값이 문자 타입인 key만 반환

    `// 입력: {a: "x", b: 3, c: "y"} → 출력: ["a", "c"] function stringValueKeys(obj) { }`

    _학습 포인트: typeof 활용, 타입 구분_
 */

    const obj = {a: "x", b: 3, c: "y"};
    console.log(stringValueKeys(obj));

    function stringValueKeys(obj) {
        let arr = [];

        for (const key in obj) {
            if (typeof obj[key] === 'string') {
                arr.push(key);
            }
        }

        return arr;
    }

    // function stringValueKeys(obj) {
    //     return Object.keys(obj).filter(key => typeof obj[key] === 'string');
    // }