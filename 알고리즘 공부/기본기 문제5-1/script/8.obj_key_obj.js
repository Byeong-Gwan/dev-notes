/**
 * 
### 8️⃣ 중첩 객체에서 특정 key만 모두 추출 (재귀 X, 단순 1단계)

    `// 입력: {a: 1, b: {c: 2, d: 3}, e: 4} → 출력: ["a", "b", "e"] function topLevelKeys(obj) { }`

    _학습 포인트: 중첩 구조 해석, 1단계 key 추출_
 */

    const obj = {a: 1, b: {c: 2, d: 3}, e: 4};
    console.log(topLevelKeys(obj));

    function topLevelKeys(obj) {
        return Object.keys(obj);
    }