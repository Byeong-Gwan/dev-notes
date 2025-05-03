/**
 * 
### 1️⃣ **공통 문자 쌍 찾기**

> 🔹 _개념_: 중첩 반복문 + 조건문  
> 🔹 _난이도_: ★★☆☆☆

    **문제**  
    두 문자열에서 **서로 같은 문자쌍을 모두 추출**해 배열로 반환하세요.  
    단, 순서를 유지해야 하며, **한 번 매칭된 문자는 다시 매칭되지 않음**.

    `// 입력: 'abc', 'acb' // 출력: ['a', 'c']`

 */

    /**
     * 'abc' 'acb' 비교해서 한번 매칭된 문자는 다시 매칭하지 않는다.
     * a === a = a
     * b === c = false 
     * c === c = c 
     * 
     * 1. a = 'abc', b = 'acb' 값 할당
     * 2. 'a' === 'a' 비교 하여 같으면 result 에 담는다.
     * 3. 'b' === 'c' 비교 하여 같으면 result 에 담고, 다르면 'b'를 제거한다.
     * 4.  중복으로 비교하지 않는다 단 str2 는 처음부터 비교한다. 
     * 5. 결과값: ['a', 'c']
     */

    console.log(commFindChar('abc', 'acb'));

    function commFindChar (str1, str2) {
        let result = []; // 결과값을 담을 거임
        let j = 0;

        for (let i = 0; i < str1.length; i++) {
            while (j < str2.length) {
                if (str1[i] === str2[j]) {
                    result.push(str1[j]);
                    j++; // str2 인덱스를 다음으로 
                } 
                j++; // 일치하지 않더라도 str2 비료했기 때문에 다음 문장으로 이동
                break;
            }
        }
        return result;
    }