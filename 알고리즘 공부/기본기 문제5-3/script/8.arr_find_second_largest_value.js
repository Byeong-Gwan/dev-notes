/**
 * 
#### 8️⃣ **배열 중 2번째로 큰 값 구하기**

    `// 입력: [10, 20, 30, 40] // 출력: 30`

 */

    const arr = [10, 20, 30, 40, 40];
    console.log(secondLargestFind(arr));

    function secondLargestFind (arr) {
        // [...new Set(arr)] 원본 배열 변형 없이 처리를 위해 사용(배열 복사 및 중복제거)
        const sortedArr = [...new Set(arr)].sort((a, b) => b - a);

        return sortedArr[1];
    }