/**
 * 
### 🧩 4️⃣ **배열 요소 총합과 평균 구하기**

* 숫자 배열을 받아 총합과 평균을 출력하는 함수를 만들어보세요.
    * 📌 조건  
    * - for문 또는 forEach 사용 가능
    * 🔹 입력 예시: [10, 20, 30, 40]  
    * 🔹 출력 예시: 총합: 100, 평균: 25  

 */

const inputArr = [10, 20, 30, 40];

console.log(arrSumAverage(inputArr));

function arrSumAverage (arr) {
    let sum = 0;
    let avg = 0;
    

    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    avg = sum / arr.length;

    return "총합: " + sum + " 평균: " + avg;
}