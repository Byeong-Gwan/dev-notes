/**
 * 
### 🧩 3️⃣ **가장 긴 단어 찾기**
* 문장이 주어졌을 때, 가장 긴 단어를 찾아 출력하세요.
    * 📌 조건  
    * - split(' ') 사용 가능
    * 🔹 입력 예시: "The quick brown fox jumps over the lazy dog"
    * 🔹 출력 예시: "jumps"  

 */

const inputStr = "The quick brown fox jumps over the lazy dog";

console.log('result: ', findLongstWords(inputStr));

function findLongstWords (str) {
    // 가져온 문자열을 공백으로 잘라서 배열로 반환
    var words = str.split(' ');
    // 최고 길이를 갖고 있는 문자열 초기 값으로 0으로 셋팅
    var maxLen = 0;
    // 결과값 담을 배열
    let result = [];

    for (let i = 0; i < words.length; i++) {
        // 각각의 문자열의 길이를 담는다.
        var wordLen = words[i].length; 

        // 각각의 문자열 길이를 확인해서 최대 값을 담는다.
        if (wordLen > maxLen) {
            maxLen = wordLen;
            result = [words[i]];
            // 만약에 같으면 결과 값에 추가로 넣어준다.
        } else if (wordLen === maxLen) {
            result.push(words[i]);
        }
    }
    return result;
}