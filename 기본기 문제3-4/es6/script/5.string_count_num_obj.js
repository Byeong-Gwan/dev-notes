/**
 * 
### 🧩 4️⃣ **배열 요소 총합과 평균 구하기**

* 문자열이 주어졌을 때, 각 단어가 몇 번 등장했는지 객체로 반환하세요.
    * 📌 조건  
    * - split(' ') 사용  
    * - 대소문자 구분 X (전부 소문자 처리 후 집계)
    * 🔹 입력 예시: "Apple banana apple Banana APPLE"
    * 🔹 출력 예시: { apple: 3, banana: 2 }  

*/

const inputStr = "Apple banana apple Banana APPLE";

console.log(countWordsObj(inputStr));

function countWordsObj (str) {
    let obj = {};
    const strArr = str.toLowerCase().split(' ');

    strArr.forEach((e) => {
        obj[e] = (obj[e] || 0) + 1;
    });

    return JSON.stringify(obj);
}