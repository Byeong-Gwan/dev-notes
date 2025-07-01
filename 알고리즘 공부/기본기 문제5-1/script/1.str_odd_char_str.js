/**
 * 
### 1️⃣ 문자열에서 홀수 번째 문자만 반환

    `// 입력: "abcdef" → 출력: "ace"(1부터 시작) function oddIndexChars(str) { }`

    _학습 포인트: 인덱스 조건 분기_
 */

    const str = "abcdef";
    console.log(oddIndexChars(str));

    function oddIndexChars(str) {
        let oddStr = '';

        for (let i = 0; i < str.length; i++) {
            if (i % 2 === 0) {
                oddStr += str[i];
            }
        }

        return oddStr;
    }