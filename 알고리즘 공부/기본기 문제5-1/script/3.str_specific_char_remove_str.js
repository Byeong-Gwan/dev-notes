/**
 * ### 3️⃣ 문자열에서 특정 문자를 제외한 나머지만 반환

    `// 입력: ("applepie", "p") → 출력: "aleie" function excludeChar(str, target) { }`

    _학습 포인트: 문자 비교 조건 변경_
 */
    const str = "applepie";
    console.log(excludeChar(str, 'p'));

    function excludeChar(str, target) {
        const specific = str.replaceAll(target, '');

        return specific;
    }