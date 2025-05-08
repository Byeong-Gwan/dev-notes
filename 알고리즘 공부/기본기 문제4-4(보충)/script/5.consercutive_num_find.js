/**
 * 
### 5️⃣ **연속된 숫자 수열 길이 구하기**

    > 🔹 _개념_: 연속 비교  
    > 🔹 _난이도_: ★★★★☆

    **문제**  
    숫자 배열에서 **연속된 수열(값이 1씩 증가)의 최대 길이**를 반환하세요.

    `// 입력: [1, 2, 3, 5, 6, 10, 11, 12, 13] // 출력: 4 → [10,11,12,13]`

 */

    console.log(consercutiveNumFind([1, 2, 3, 5, 6, 10, 11, 12, 13]));

    function consercutiveNumFind (arr) {
        if (arr.length === 0) return 0;

        let maxLength = 1; // 최대 길이를 저장
        let currentLength = 1; // 현재 연속된 수열의 길이
        let sequenceStart = 0; // 현재 수열의 시작 인덱스
        let maxSequence = [arr[0]]; // 가장 긴 수열 배열로 저장

        for (let i = 1; i < arr.length; i++) {
            // 연속된 숫자인지 확인
            // 현재 숫자가 이전 숫자 + 1 값과 같으면 연속된 수열
            if (arr[i] === arr[i-1] + 1) {
                currentLength++;
            } else {
                // 연속되지 않는 경우, 현재 수열 길이와 최대 길이를 비교
                if (currentLength > maxLength) {
                    maxLength = currentLength;
                    maxSequence = arr.slice(sequenceStart, i);
                }
                // 새로운 수열 시작
                currentLength = 1;
                sequenceStart = i;
            }
        }

        // 마지막 수열도 확인
        if (currentLength > maxLength) {
            maxSequence = arr.slice(sequenceStart, arr.length);
            maxLength = currentLength;
        }

        console.log('연속된 수열: ', maxSequence);
        return maxLength;
    }