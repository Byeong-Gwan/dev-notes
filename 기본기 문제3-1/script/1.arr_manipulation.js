/*
## **📌 1️⃣ 배열 조작 문제 (데이터 핸들링 연습)**

**📝 문제:**  
주어진 배열에서 **짝수만 찾아서 새로운 배열로 반환하는 함수**를 만들어라.  
단, **`for`문만 사용하고 `filter`는 사용 금지!**

    **🔹 입력 예시:**


    `let numbers = [3, 6, 9, 12, 15, 18, 21, 24]; console.log(getEvenNumbers(numbers));`

    **🔹 출력 예시:**

    `[6, 12, 18, 24]`

    **✔ 조건:**

    - `for`문을 사용해서 직접 배열을 순회할 것
        
    - `filter()` 사용 금지
        

*/ 

let numbers = [3, 6, 9, 12, 15, 18, 21, 24]; 
console.log(getEvenNumbers(numbers));

function getEvenNumbers (arrNum) {
    let arr = [];
    for (let i = 0; i < arrNum.length; i++) {
        if (arrNum[i] % 2 === 0) {
            arr.push(arrNum[i]);
        } else {continue;}
    }
    return arr;
}