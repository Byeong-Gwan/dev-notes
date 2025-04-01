/**
 * 
## **📌 3️⃣ 실무 감각 키우는 문제 (API 응답 데이터 가공하기)**

**📝 문제:**  
다음과 같은 API 응답 데이터가 있다고 가정하자.  
이 데이터에서 **나이가 20살 이상인 사람들만 추출해서 새로운 배열을 만들어라.**  
단, **`map`, `filter` 사용 금지!**

    **🔹 데이터 예시:**


    `let users = [   { name: "철수", age: 18 },   { name: "영희", age: 22 },   { name: "민수", age: 25 },   { name: "지연", age: 17 } ];  console.log(getAdults(users));`

    **🔹 출력 예시:**


    `[   { name: "영희", age: 22 },   { name: "민수", age: 25 } ]`

    **✔ 조건:**

    - `for`문을 사용해서 직접 배열을 순회할 것
        
    - `filter()` 사용 금지
        
 */

    let users = [
        { name: "철수", age: 18 },   
        { name: "영희", age: 22 },  
        { name: "민수", age: 25 },   
        { name: "지연", age: 17 },
        { name: "현우", age: 20 }  
    ];
    
    console.log(getAdults(users));

    function getAdults(users) {
        let arr = [];

        for (let i = 0; i < users.length; i++){
            if (users[i].age >= 20) {
                arr.push(users[i]);
            }
        }
        return arr;
    }