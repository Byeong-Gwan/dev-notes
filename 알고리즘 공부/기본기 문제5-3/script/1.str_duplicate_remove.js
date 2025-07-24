/**
 * 
 * #### 1️⃣ **중복 문자 제거 (첫 등장만 남기기)**

    `// 입력: "abacb" // 출력: "abc"`

    힌트: Set 사용 or 인덱스 비교

 */

    const str = "abacb";
    console.log(duplicateRemove(str));

    function duplicateRemove(str) {
        return [...new Set(str)].join('');
    }