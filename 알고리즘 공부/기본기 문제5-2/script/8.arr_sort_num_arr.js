/**
 * 
### **8️⃣ 숫자 배열 오름차순 정렬 (sort 연습)**

    `// 입력: [5, 1, 4, 2] → 출력: [1, 2, 4, 5]`

    `function sortAsc(arr) { }`

 */
    const arr = [5, 1, 4, 2];
    console.log(sortAsc(arr));

    function sortAsc(arr) {
        // 원본 배열은 건드리지 않고 처리 ([...arr])
        return [...arr].sort((a, b) => a - b);
    }