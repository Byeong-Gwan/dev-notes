/**
 * 
### 5. **가장 긴 문자열 찾기**

    ```
    // 문자열 배열에서 가장 긴 문자열을 찾아라. 
    // 입력: ["apple", "banana", "watermelon", "kiwi"] 
    // 출력: "watermelon"
 */

    const arr = ["apple", "banana", "watermelon", "kiwi"];
    console.log(findLongestSentence(arr));

    function findLongestSentence (arr) {
        let longestSentence = '';
        let maxLength = 0;

        for (let i = 0; i < arr.length; i++) {
            const currentSentence = arr[i];
            const currentLength = currentSentence.length;

            if (currentLength > maxLength) {
                maxLength = currentLength;
                longestSentence = currentSentence;
            }
        }

        return longestSentence;

    }