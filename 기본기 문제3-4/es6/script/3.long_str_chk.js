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

/**
 * 비효율적으로 for문을 두번 순회하게되는데
 * 동일한 길이의 문자열을 모두 찾기위해 처리
 */
function findLongstWords (str) {
    // 가져온 데이터 ' '기준으로 잘라서 배열로 담기
    const arr = str.split(' ');
    // 배열을 순회해서 각각 문자열 길이 배열
    const eachLength = arr.map(a => a.length);
    // 가장 긴 배열의 길이 담기
    const maxNum = Math.max(...eachLength);
    // 동일한 문자열 길이 index 위치 담기
    const where = [];
    // 결과 값 반환
    const result = [];   

    // 배열(eachLength) 순회해서 동일한 길이가 있으면 where 에 담기
    for (let i = 0; i < eachLength.length; i++) {
        if (eachLength[i] === maxNum) {
            where.push(i);
        }
    }
    
    // where 배열 순회 해서 arr 에 갖고온 데이터 어떤 문자열인지 result 값에 담음
    for (let i = 0; i < where.length; i++) {
        result.push(arr[where[i]]);
    }
    // 담은 배열 반환
    return result;
}