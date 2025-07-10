/**
 * 
### 9️⃣ 객체에서 value 기준으로 오름차순 정렬된 key 배열 반환

    `// 입력: {a: 3, b: 1, c: 2} → 출력: ["b", "c", "a"] function sortKeysByValue(obj) { }`

    _학습 포인트: 객체 정렬 로직_
 */

    const obj = {a: 3, b: 1, c: 2};
    console.log(sortKeysByValue(obj));

    function sortKeysByValue(obj) {
        const sorted = Object.entries(obj).sort((a, b) => a[1] - b[1]);
        let arr = [];

        for (const key of sorted) {
            arr.push(key[0]);
        }

        return arr;
    }

    // function sortKeysByValue(obj) {
    //     return Object.entries(obj)
    //                 .sort((a, b) => a[1] - b[1])
    //                 .map(entry => entry[0]);
    // }